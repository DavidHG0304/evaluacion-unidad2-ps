const OrderController = require("./OrderController");
const OrderService = require("./OrderService");
const UserService = require("./UserService");
const InventoryService = require("./InventoryService");
const PricingService = require("./PricingService");
const PaymentService = require("./PaymentService");
const NotificationService = require("./NotificationService");

test("Top-Down", async () => {
  // Nivel 1: OrderController (stub de OrderService)
  const orderServiceStub = {
    createOrder: async () => ({
      orderId: 10,
      total: 220,
      transactionId: 555,
    }),
  };

  const controller1 = new OrderController(orderServiceStub);

  const result1 = await controller1.createOrder({
    userId: 2,
    productId: 1,
    quantity: 4,
    price: 50,
  });

  console.log(result1);

  expect(result1.status).toBe("success");
  expect(result1.data.orderId).toBeDefined();
  expect(result1.data.total).toBeDefined();
  expect(result1.data.transactionId).toBeDefined();

  // Nivel 2: OrderController + OrderService (stubs: user, inventory, pricing, payment, notification)
  const userStub = { validateUser: () => ({ valid: true }) };

  const inventoryStub = {
    checkStock: () => true,
    reduceStock: () => ({ quantity: 6 }),
  };

  const pricingStub = { calculateFinalPrice: () => 220 };

  const paymentStub = {
    processPayment: async () => ({
      status: "success",
      transactionId: 888,
    }),
  };

  const notificationStub = {
    sendNotification: async () => ({ status: "sent" }),
  };

  const orderService2 = new OrderService(
    userStub,
    inventoryStub,
    pricingStub,
    paymentStub,
    notificationStub,
  );

  const controller2 = new OrderController(orderService2);

  const result2 = await controller2.createOrder({
    userId: 2,
    productId: 1,
    quantity: 4,
    price: 50,
  });

  console.log(result2);

  expect(result2.status).toBe("success");
  expect(result2.data.orderId).toBeDefined();
  expect(result2.data.total).toBe(220);
  expect(result2.data.transactionId).toBeDefined();

  // Nivel 3: OrderController + OrderService + UserService + InventoryService + PricingService (stubs: payment, notification)
  const orderService3 = new OrderService(
    new UserService(),
    new InventoryService(),
    new PricingService(),
    paymentStub,
    notificationStub,
  );

  const controller3 = new OrderController(orderService3);

  const result3 = await controller3.createOrder({
    userId: 2,
    productId: 1,
    quantity: 3,
    price: 80,
  });

  console.log(result3);

  expect(result3.status).toBe("success");
  expect(result3.data.orderId).toBeDefined();
  expect(result3.data.total).toBeGreaterThan(0);
  expect(result3.data.transactionId).toBeDefined();

  // Nivel 4: OrderController + OrderService + UserService + InventoryService + PricingService + PaymentService + NotificationService
  const orderService4 = new OrderService(
    new UserService(),
    new InventoryService(),
    new PricingService(),
    new PaymentService(),
    new NotificationService(),
  );

  const controller4 = new OrderController(orderService4);

  const result4 = await controller4.createOrder({
    userId: 1,
    productId: 1,
    quantity: 1,
    price: 120,
  });

  console.log(result4);

  expect(result4.status).toBe("success");
  expect(result4.data.orderId).toBeDefined();
  expect(result4.data.total).toBeGreaterThan(0);
  expect(result4.data.transactionId).toBeDefined();
});

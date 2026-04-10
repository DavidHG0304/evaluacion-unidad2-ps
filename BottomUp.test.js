// =========================
// NIVEL 1: User + Inventory
// =========================

const UserService = require("./UserService");
const InventoryService = require("./InventoryService");

test("Bottom-Up: nivel inicial (User + Inventory)", () => {
  const user = new UserService();
  const inventory = new InventoryService();

  const userResult = user.validateUser(1);
  const stock = inventory.checkStock(1, 2);

  console.log(userResult);
  console.log(stock);

  expect(userResult.valid).toBe(true);
  expect(stock).toBe(true);
});

// =========================
// NIVEL 2: + Pricing
// =========================

const PricingService = require("./PricingService");

test("Bottom-Up: nivel medio (User + Inventory + Pricing)", () => {
  const user = new UserService();
  const inventory = new InventoryService();
  const pricing = new PricingService();

  const userResult = user.validateUser(1);
  const stock = inventory.checkStock(1, 2);
  const total = pricing.calculateFinalPrice(100, 2);

  console.log(userResult);
  console.log(stock);
  console.log(total);

  expect(userResult.valid).toBe(true);
  expect(stock).toBe(true);
  expect(total).toBeGreaterThan(0);
});

// =========================
// NIVEL 3: + Payment
// =========================

const PaymentService = require("./PaymentService");

test("Bottom-Up: nivel avanzado (User + Inventory + Pricing + Payment)", async () => {
  const user = new UserService();
  const inventory = new InventoryService();
  const pricing = new PricingService();
  const paymentService = new PaymentService();

  const userResult = user.validateUser(1);
  const stock = inventory.checkStock(1, 2);
  const total = pricing.calculateFinalPrice(100, 2);
  const payment = await paymentService.processPayment(total);

  console.log(userResult);
  console.log(stock);
  console.log(total);
  console.log(payment);

  expect(userResult.valid).toBe(true);
  expect(stock).toBe(true);
  expect(payment.status).toBe("success");
});

// =========================
// NIVEL 4: + Notification
// =========================

const NotificationService = require("./NotificationService");

test("Bottom-Up: nivel completo sin OrderService", async () => {
  const user = new UserService();
  const inventory = new InventoryService();
  const pricing = new PricingService();
  const paymentService = new PaymentService();
  const notification = new NotificationService();

  const userResult = user.validateUser(1);
  const stock = inventory.checkStock(1, 2);
  const total = pricing.calculateFinalPrice(100, 2);
  const payment = await paymentService.processPayment(total);
  const notify = await notification.sendNotification(1, "Test");

  console.log(userResult);
  console.log(stock);
  console.log(total);
  console.log(payment);
  console.log(notify);

  expect(userResult.valid).toBe(true);
  expect(stock).toBe(true);
  expect(payment.status).toBe("success");
  expect(notify.status).toBe("sent");
});

// =========================
// NIVEL 5: Sistema completo (OrderService)
// =========================

const OrderService = require("./OrderService");

test("Bottom-Up: sistema completo", async () => {
  const user = new UserService();
  const inventory = new InventoryService();
  const pricing = new PricingService();
  const paymentService = new PaymentService();
  const notification = new NotificationService();

  const orderService = new OrderService(
    user,
    inventory,
    pricing,
    paymentService,
    notification,
  );

  const result = await orderService.createOrder(1, 1, 2, 100);

  console.log(result);

  expect(result.orderId).toBeDefined();
  expect(result.total).toBeGreaterThan(0);
  expect(result.transactionId).toBeDefined();
});

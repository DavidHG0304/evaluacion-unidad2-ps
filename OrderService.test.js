const OrderService = require("./OrderService");
const UserService = require("./UserService");
const InventoryService = require("./InventoryService");
const PricingService = require("./PricingService");
const PaymentService = require("./PaymentService");
const NotificationService = require("./NotificationService");

describe("OrderService", () => {
  let service;

  beforeEach(() => {
    service = new OrderService(
      new UserService(),
      new InventoryService(),
      new PricingService(),
      new PaymentService(),
      new NotificationService(),
    );
  });

  test("should create order successfully", async () => {
    const result = await service.createOrder(1, 1, 2, 100);

    expect(result.orderId).toBeDefined();
    expect(result.total).toBeGreaterThan(0);
    expect(result.transactionId).toBeDefined();
  });

  test("should fail if user is invalid", async () => {
    await expect(service.createOrder(999, 1, 1, 100)).rejects.toThrow(
      "User not found",
    );
  });

  test("should fail if user is inactive", async () => {
    await expect(service.createOrder(3, 1, 1, 100)).rejects.toThrow(
      "User inactive",
    );
  });

  test("should fail if no stock", async () => {
    await expect(service.createOrder(1, 2, 100, 100)).rejects.toThrow(
      "Out of stock",
    );
  });

  test("should process payment correctly", async () => {
    const result = await service.createOrder(1, 1, 1, 100);
    expect(result.transactionId).toBeDefined();
  });
});

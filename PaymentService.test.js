const PaymentService = require("./PaymentService");

describe("PaymentService", () => {
  let service;

  beforeEach(() => {
    service = new PaymentService();
  });

  test("should process a valid payment successfully", async () => {
    const result = await service.processPayment(100);

    expect(result.status).toBe("success");
    expect(result.transactionId).toBeDefined();
  });

  test("should throw error when amount is zero or negative", async () => {
    await expect(service.processPayment(0)).rejects.toThrow(
      "Invalid payment amount",
    );

    await expect(service.processPayment(-50)).rejects.toThrow(
      "Invalid payment amount",
    );
  });
});

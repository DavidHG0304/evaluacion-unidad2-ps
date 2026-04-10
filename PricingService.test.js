const PricingService = require("./PricingService");

describe("PricingService", () => {
  let service;

  beforeEach(() => {
    service = new PricingService();
  });

  // =========================
  // SUBTOTAL
  // =========================

  test("should calculate subtotal correctly", () => {
    expect(service.calculateSubtotal(100, 2)).toBe(200);
  });

  // =========================
  // TAX
  // =========================

  test("should calculate tax correctly (10%)", () => {
    expect(service.calculateTax(200)).toBe(20);
  });

  // =========================
  // DISCOUNT
  // =========================

  test("should apply 10% discount when amount > 100", () => {
    expect(service.applyDiscount(150)).toBe(135);
  });

  test("should apply 15% discount when amount > 200", () => {
    expect(service.applyDiscount(300)).toBe(255);
  });

  test("should not apply discount when amount <= 100", () => {
    expect(service.applyDiscount(100)).toBe(100);
  });

  // =========================
  // FINAL PRICE
  // =========================

  test("should calculate final price correctly without discount", () => {
    expect(service.calculateFinalPrice(50, 2)).toBe(110);
  });

  test("should calculate final price with discount", () => {
    expect(service.calculateFinalPrice(100, 2)).toBe(198);
  });
});

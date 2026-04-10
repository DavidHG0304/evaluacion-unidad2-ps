const InventoryService = require("./InventoryService");

describe("InventoryService", () => {
  let service;

  beforeEach(() => {
    service = new InventoryService();
  });

  // CHECK STOCK

  test("should return true when stock is sufficient", () => {
    expect(service.checkStock(1, 2)).toBe(true);
  });

  test("should return false when stock is insufficient", () => {
    expect(service.checkStock(2, 10)).toBe(false);
  });

  test("should throw error when product does not exist", () => {
    expect(() => service.checkStock(999, 1)).toThrow("Product not found");
  });

  test("should throw error for invalid quantity", () => {
    expect(() => service.checkStock(1, -1)).toThrow("Invalid quantity");
    expect(() => service.checkStock(1, "a")).toThrow("Invalid quantity");
  });

  // REDUCE STOCK

  test("should reduce stock correctly", () => {
    const result = service.reduceStock(1, 3);
    expect(result.quantity).toBe(7);
  });

  test("should throw error when reducing more than available", () => {
    expect(() => service.reduceStock(2, 10)).toThrow("Insufficient stock");
  });

  test("should throw error when product does not exist on reduce", () => {
    expect(() => service.reduceStock(999, 1)).toThrow("Product not found");
  });

  test("should throw error for invalid quantity on reduce", () => {
    expect(() => service.reduceStock(1, -1)).toThrow("Invalid quantity");
    expect(() => service.reduceStock(1, "a")).toThrow("Invalid quantity");
  });

  test("should not change stock when quantity is zero", () => {
    const result = service.reduceStock(1, 0);
    expect(result.quantity).toBe(10);
  });
});

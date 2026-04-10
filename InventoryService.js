class InventoryService {
  constructor() {
    this.stock = {
      1: { quantity: 10 },
      2: { quantity: 5 },
    };
  }

  validateQuantity(quantity) {
    if (typeof quantity !== "number" || isNaN(quantity) || quantity < 0) {
      throw new Error("Invalid quantity");
    }
  }

  checkStock(productId, quantity) {
    if (!this.stock[productId]) {
      throw new Error("Product not found");
    }

    this.validateQuantity(quantity);

    return this.stock[productId].quantity >= quantity;
  }

  reduceStock(productId, quantity) {
    if (!this.stock[productId]) {
      throw new Error("Product not found");
    }

    this.validateQuantity(quantity);

    if (!this.checkStock(productId, quantity)) {
      throw new Error("Insufficient stock");
    }

    this.stock[productId].quantity -= quantity;
    return this.stock[productId];
  }
}

module.exports = InventoryService;

class InventoryService {
  constructor() {
    this.stock = {
      1: { quantity: 10 },
      2: { quantity: 5 }
    };
  }

  checkStock(productId, quantity) {
    if (!this.stock[productId]) throw new Error('Product not found');
    return this.stock[productId].quantity >= quantity;
  }

  reduceStock(productId, quantity) {
    if (!this.checkStock(productId, quantity)) {
      throw new Error('Insufficient stock');
    }

    this.stock[productId].quantity -= quantity;
    return this.stock[productId];
  }
}

module.exports = InventoryService;
class PricingService {
  calculateSubtotal(price, quantity) {
    return price * quantity;
  }

  calculateTax(amount) {
    return amount * 0.1;
  }

  applyDiscount(amount) {
    if (amount > 200) return amount - amount * 0.15;
    if (amount > 100) return amount - amount * 0.1;
    return amount;
  }

  calculateFinalPrice(price, quantity) {
    const subtotal = this.calculateSubtotal(price, quantity);

    const discounted = this.applyDiscount(subtotal);

    const tax = this.calculateTax(discounted);

    return discounted + tax;
  }
}

module.exports = PricingService;

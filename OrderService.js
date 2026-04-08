class OrderService {
  constructor(user, inventory, pricing, payment, notification) {
    this.user = user;
    this.inventory = inventory;
    this.pricing = pricing;
    this.payment = payment;
    this.notification = notification;
  }

  async createOrder(userId, productId, quantity, price) {
    const userValid = this.user.validateUser(userId);
    if (!userValid.valid) throw new Error(userValid.message);

    if (!this.inventory.checkStock(productId, quantity)) {
      throw new Error('Out of stock');
    }

    const total = this.pricing.calculateFinalPrice(price, quantity);

    this.inventory.reduceStock(productId, quantity);
    const payment = await this.payment.processPayment(total);

    if (payment.status !== 'success') {
      throw new Error('Payment failed');
    }

    await this.notification.sendNotification(userId, 'Order created');

    return {
      orderId: Math.random(),
      total,
      transactionId: payment.transactionId
    };
  }
}

module.exports = OrderService;
class PaymentService {
  async processPayment(amount) {
    if (amount <= 0) {
      return { status: 'error' };
    }

    return {
      status: 'success',
      transactionId: Math.floor(Math.random() * 10000)
    };
  }
}

module.exports = PaymentService;
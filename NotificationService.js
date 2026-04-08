class NotificationService {
  async sendNotification(userId, message) {
    if (!userId || !message) {
      throw new Error('Invalid notification');
    }

    return { status: 'sent' };
  }
}

module.exports = NotificationService;
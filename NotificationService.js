class NotificationService {
  async sendNotification(userId, message) {
    if (
      typeof userId !== "number" ||
      isNaN(userId) ||
      typeof message !== "string" ||
      message.trim() === ""
    ) {
      throw new Error("Invalid notification");
    }

    return { status: "sent" };
  }
}

module.exports = NotificationService;

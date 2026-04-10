const NotificationService = require("./NotificationService");

describe("NotificationService", () => {
  let service;

  beforeEach(() => {
    service = new NotificationService();
  });

  test("should send notification successfully", async () => {
    const result = await service.sendNotification(1, "Order created");
    expect(result.status).toBe("sent");
  });

  test("should throw error when userId is missing", async () => {
    await expect(service.sendNotification(null, "msg")).rejects.toThrow(
      "Invalid notification",
    );
  });

  test("should throw error when message is missing", async () => {
    await expect(service.sendNotification(1, null)).rejects.toThrow(
      "Invalid notification",
    );
  });

  test("should throw error when message is empty", async () => {
    await expect(service.sendNotification(1, "")).rejects.toThrow(
      "Invalid notification",
    );
  });

  test("should throw error when userId is invalid type", async () => {
    await expect(service.sendNotification("a", "msg")).rejects.toThrow(
      "Invalid notification",
    );
  });
});

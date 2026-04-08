const UserService = require('./UserService');

describe('UserService', () => {
  let service;

  beforeEach(() => {
    service = new UserService();
  });

  test('Valid user', () => {
    const result = service.validateUser(1);
    expect(result.valid).toBe(true);
  });

  test('Nonexistent user', () => {
    const result = service.validateUser(999);
    expect(result.valid).toBe(false);
    expect(result.message).toBe('User not found');
  });

  test('Inactive user', () => {
    const result = service.validateUser(3);
    expect(result.valid).toBe(false);
    expect(result.message).toBe('User inactive');
  });
});
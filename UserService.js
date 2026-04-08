class UserService {
  constructor() {
    this.users = [
      { id: 1, active: true },
      { id: 2, active: true },
      { id: 3, active: false }
    ];
  }

  findUser(userId) {
    return this.users.find(u => u.id === userId);
  }

  validateUser(userId) {
    const user = this.findUser(userId);

    if (!user) return { valid: false, message: 'User not found' };
    if (!user.active) return { valid: false, message: 'User inactive' };

    return { valid: true };
  }
}

module.exports = UserService;
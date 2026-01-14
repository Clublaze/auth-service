import User from "../models/user.model.js";

class UserRepository {
  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findBySystemId(systemId) {
    return User.findOne({ systemId });
  }

  async findById(id) {
    return User.findById(id);
  }

  async create(userData) {
    return User.create(userData);
  }

  async updateStatus(userId, status) {
    return User.findByIdAndUpdate(userId, { status }, { new: true });
  }

  async markEmailVerified(userId) {
    return User.findByIdAndUpdate(
      userId,
      { isEmailVerified: true },
      { new: true }
    );
  }
}

export default new UserRepository();

import User from "../models/user.model.js";

class UserRepository {
  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findBySystemId(systemId) {
    return User.findOne({ systemId });
  }

  async findById(id) {
    return User.findOne({ id });
  }

  async create(userData) {
    return User.create(userData);
  }

  async updateStatus(userId, status) {
    return User.findOneAndUpdate(
      { id: userId },
      { status },
      { new: true }
    );
  }

  async markEmailVerified(userId) {
    return User.findOneAndUpdate(
      { id: userId },
      { isEmailVerified: true },
      { new: true }
    );
  }
}

export default new UserRepository();

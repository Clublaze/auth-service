import EmailToken from "../models/emailToken.model.js";

class EmailTokenRepository {
  async create(data) {
    return EmailToken.create(data);
  }

  async findValid(token, type) {
    return EmailToken.findOne({
      token,
      type,
      expiresAt: { $gt: new Date() },
      revoked: false
    });
  }

  async delete(token) {
    return EmailToken.deleteOne({ token });
  }
}

export default new EmailTokenRepository();

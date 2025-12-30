import RefreshToken from "../models/refreshToken.model.js";

class RefreshTokenRepository {
  async create(data) {
    return RefreshToken.create(data);
  }

  async find(token) {
    return RefreshToken.findOne({
      token,
      revoked: false,
      expiresAt: { $gt: new Date() },
    });
  }

  async revoke(token) {
    return RefreshToken.findOneAndUpdate(
      { token },
      { revoked: true },
      { new: true }
    );
  }

  async revokeAllForUser(userId) {
    return RefreshToken.updateMany({ userId }, { revoked: true });
  }
}

export default new RefreshTokenRepository();

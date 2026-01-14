import crypto from "crypto";
import emailTokenRepository from "../repositories/emailToken.repository.js";

class EmailService {
  async generateToken(userId, type) {
    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await emailTokenRepository.create({
      userId,
      token,
      type,
      expiresAt,
    });

    return token;
  }

  async verifyToken(token, type) {
    const emailToken = await emailTokenRepository.findValid(token, type);
    if (!emailToken) return null;

    await emailTokenRepository.delete(token);
    return emailToken;
  }
}

export default new EmailService();

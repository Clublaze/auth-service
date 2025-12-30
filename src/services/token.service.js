import jwt from "jsonwebtoken";
import crypto from "crypto";
import refreshTokenRepository from "../repositories/refreshToken.repository.js";
import AppError from "../utils/appError.js";
import { env } from "../config/env.js";

class TokenService {
  generateAccessToken(user, permissions = []) {
    return jwt.sign(
      {
        sub: user.id,
        universityId: user.universityId,
        type: user.userType,
        permissions, // PBAC claims
      },
      env.jwtAccessSecret,   // ✅ FIXED
      {
        expiresIn: env.accessTokenExpires,
        issuer: env.jwtIssuer,
      }
    );
  }

  async generateRefreshToken(userId) {
    const token = crypto.randomBytes(40).toString("hex");

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await refreshTokenRepository.create({
      userId,
      token,
      expiresAt,
    });

    return token;
  }

  async rotateRefreshToken(oldToken) {
    const storedToken = await refreshTokenRepository.find(oldToken);

    if (!storedToken) {
      throw new AppError("Invalid or expired refresh token", 401);
    }

    await refreshTokenRepository.revoke(oldToken);

    return this.generateRefreshToken(storedToken.userId);
  }

  async revokeAllSessions(userId) {
    await refreshTokenRepository.revokeAllForUser(userId);
  }
}

export default new TokenService();

import jwt from "jsonwebtoken";
import crypto from "crypto";

import refreshTokenRepository from "../repositories/refreshToken.repository.js";
import AppError from "../utils/appError.js";
import env from "../config/env.js";

class TokenService {
  /**
   * 🔐 Generate Access Token (JWT)
   * Used for API authorization
   */
  generateAccessToken(user, permissions = []) {
    if (!env.accessTokenSecret) {
      throw new AppError("Access token secret is not configured", 500);
    }

    return jwt.sign(
      {
        sub: user.id,
        universityId: user.universityId,
        type: user.userType,
        permissions, // PBAC claims
      },
      env.accessTokenSecret, // ✅ FIXED (was env.jwtAccessSecret)
      {
        expiresIn: env.accessTokenExpiresIn, // ✅ FIXED
        issuer: env.jwtIssuer || "auth-service",
      }
    );
  }

  /**
   * 🔁 Generate Refresh Token (DB stored)
   */
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

  /**
   * 🔄 Rotate Refresh Token
   * (Invalidate old, issue new)
   */
  async rotateRefreshToken(oldToken) {
    const storedToken = await refreshTokenRepository.find(oldToken);

    if (!storedToken) {
      throw new AppError("Invalid or expired refresh token", 401);
    }

    if (storedToken.expiresAt < new Date()) {
      await refreshTokenRepository.revoke(oldToken);
      throw new AppError("Refresh token expired", 401);
    }

    await refreshTokenRepository.revoke(oldToken);

    return this.generateRefreshToken(storedToken.userId);
  }

  /**
   * 🚪 Logout from all devices
   */
  async revokeAllSessions(userId) {
    await refreshTokenRepository.revokeAllForUser(userId);
  }
}

export default new TokenService();

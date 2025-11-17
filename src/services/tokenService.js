import jwt from "jsonwebtoken";
import crypto from "crypto";
import { config } from "../config/env.js";

export const tokenService = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.ACCESS_TOKEN_EXPIRES || "15m",
    });
  },

  generateRefreshToken: (payload) => {
    return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.REFRESH_TOKEN_EXPIRES || "7d",
    });
  },

  verifyAccessToken: (token) => {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  },

  hashRefreshToken: (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
  },

  compareRefreshTokens: (token, storedHash) => {
    const hash = crypto.createHash("sha256").update(token).digest("hex");
    return hash === storedHash;
  },
};

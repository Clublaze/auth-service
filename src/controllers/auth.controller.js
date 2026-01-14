import authService from "../services/auth.service.js";
import env from "../config/env.js";

class AuthController {
  async registerStudent(req, res, next) {
    try {
      const user = await authService.registerStudent(req.body);
      res.status(201).json({
        message: "Student registered successfully",
        userId: user._id,
      });
    } catch (error) {
      next(error);
    }
  }

  async registerFaculty(req, res, next) {
    try {
      const user = await authService.registerFaculty(req.body);
      res.status(201).json({
        message: "Faculty registered successfully",
        userId: user._id,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { accessToken, refreshToken } = await authService.login(req.body);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env.nodeEnv,
        sameSite: "lax",
        path: "/api/auth",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const oldRefreshToken = req.cookies.refreshToken;

      if (!oldRefreshToken) {
        return res.status(401).json({ message: "Refresh token missing" });
      }

      const newRefreshToken = await tokenService.rotateRefreshToken(
        oldRefreshToken
      );

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/api/auth/refresh",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // We must fetch userId from old token record
      const payload = await tokenService.getPayloadFromRefreshToken(
        newRefreshToken
      );

      const accessToken = tokenService.generateAccessToken({
        sub: payload.userId.toString(),
        universityId: payload.universityId,
        type: payload.userType,
      });

      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      await tokenService.revokeAllSessions(req.user.id);

      res.clearCookie("refreshToken", {
        path: "/api/auth/refresh",
      });

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }

  async me(req, res) {
    res.status(200).json({
      user: req.user,
    });
  }
}

export default new AuthController();

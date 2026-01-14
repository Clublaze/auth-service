import authService from "../services/auth.service.js";

class AuthController {
  async registerStudent(req, res, next) {
    try {
      const user = await authService.registerStudent(req.body);
      res.status(201).json({
        message: "Student registered successfully",
        userId: user.id,
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
        userId: user.id,
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
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/api/auth/refresh",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

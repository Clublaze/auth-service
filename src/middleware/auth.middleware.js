import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import env from "../config/env.js";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authorization token missing", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.accessTokenSecret);

    /*
      decoded payload structure (from token.service):
      {
        sub: userId,
        universityId,
        type,
        permissions,
        iat,
        exp,
        iss
      }
    */

    req.user = {
      id: decoded.sub, // Mongo _id (string)
      universityId: decoded.universityId,
      userType: decoded.type,
      permissions: decoded.permissions || [],
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next(new AppError("Access token expired", 401));
    } else if (error.name === "JsonWebTokenError") {
      next(new AppError("Invalid access token", 401));
    } else {
      next(error);
    }
  }
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.userType)) {
      return next(new AppError("Forbidden", 403));
    }
    next();
  };
};

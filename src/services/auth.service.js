import userRepository from "../repositories/user.repository.js";
import universityService from "./university.service.js";
import passwordService from "./password.service.js";
import tokenService from "./token.service.js";
import AppError from "../utils/appError.js";

import {
  publishUserRegistered,
  publishUserLoggedIn,
} from "../messaging/producers/user.producer.js";

class AuthService {
  async registerStudent({ email, password, systemId }) {
    const university = await universityService.resolveUniversityByEmail(email);
    universityService.validateStudent(university, email, systemId);

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    const passwordHash = await passwordService.hash(password);

    const user = await userRepository.create({
      universityId: university._id,
      userType: "STUDENT",
      systemId,
      email,
      passwordHash,
    });

    try {
      await publishUserRegistered({
        userId: user.id,
        email: user.email,
        userType: user.userType,
        universityId: user.universityId,
      });
    } catch (error) {
      console.error(
        "Kafka publish failed: user.registered",
        error.message
      );
    }

    return user;
  }

  async registerFaculty({ email, password }) {
    const university = await universityService.resolveUniversityByEmail(email);
    universityService.validateFaculty(university, email);

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    const passwordHash = await passwordService.hash(password);

    const user = await userRepository.create({
      universityId: university._id,
      userType: "FACULTY",
      email,
      passwordHash,
      isEmailVerified: true,
    });

    try {
      await publishUserRegistered({
        userId: user.id,
        email: user.email,
        userType: user.userType,
        universityId: user.universityId,
      });
    } catch (error) {
      console.error(
        "Kafka publish failed: user.registered",
        error.message
      );
    }

    return user;
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);

    if (!user || user.status !== "ACTIVE") {
      throw new AppError("Invalid credentials", 401);
    }

    const valid = await passwordService.compare(password, user.passwordHash);
    if (!valid) {
      throw new AppError("Invalid credentials", 401);
    }

    const accessToken = tokenService.generateAccessToken({
      sub: user.id,
      universityId: user.universityId,
      type: user.userType,
    });

    const refreshToken = await tokenService.generateRefreshToken(user.id);

    try {
      await publishUserLoggedIn({
        userId: user.id,
        userType: user.userType,
        universityId: user.universityId,
      });
    } catch (error) {
      console.error(
        "Kafka publish failed: user.logged_in",
        error.message
      );
    }

    return { accessToken, refreshToken };
  }
}

export default new AuthService();

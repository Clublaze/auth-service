import userRepository from "../repositories/user.repository.js";
import universityService from "./university.service.js";
import passwordService from "./password.service.js";
import tokenService from "./token.service.js";
import AppError from "../utils/appError.js";

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

    return user;
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);

    if (!user || user.status !== "ACTIVE") {
      throw new Error("Invalid credentials");
    }

    const valid = await passwordService.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = tokenService.generateAccessToken({
      sub: user.id,
      universityId: user.universityId,
      type: user.userType,
    });

    const refreshToken = await tokenService.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }
}

export default new AuthService();

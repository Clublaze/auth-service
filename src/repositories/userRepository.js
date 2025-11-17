// src/repositories/userRepository.js
import User from "../models/user.model.js";

export const userRepository = {
  create: async (data) => {
    const user = new User(data);
    return user.save();
  },

  findByEmail: async (email) => {
    return User.findOne({ email });
  },

  findBySystemId: async (systemId) => {
    return User.findOne({ systemId });
  },

  findById: async (id) => {
    return User.findById(id);
  },

  updateById: async (userId, updateData) => {
    return User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
  },

  saveOtp: async (userId, otp, otpExpiresAt) => {
    return User.findByIdAndUpdate(
      userId,
      { otp, otpExpiresAt },
      { new: true }
    );
  },

  verifyUser: async (userId) => {
    return User.findByIdAndUpdate(
      userId,
      {
        isVerified: true,
        status: "ACTIVE",
        otp: null,
        otpExpiresAt: null,
      },
      { new: true }
    );
  },

  saveRefreshToken: async (userId, refreshTokenHash) => {
    return User.findByIdAndUpdate(
      userId,
      { refreshTokenHash },
      { new: true }
    );
  },
};

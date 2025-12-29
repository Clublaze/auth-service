// src/services/otpService.js

import { generateOtp } from "../utils/generateOtp.js";

export const otpService = {
  generateOtpData: (expiryMinutes = 10) => {
    const otp = generateOtp(6);

    const otpExpiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    return { otp, otpExpiresAt };
  },

  isOtpExpired: (expiryDate) => {
    if (!expiryDate) return true;
    return new Date() > new Date(expiryDate);
  }
};

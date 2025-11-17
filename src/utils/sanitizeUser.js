// src/utils/sanitizeUser.js

export const sanitizeUser = (user) => {
  if (!user) return null;

  const obj = user.toObject ? user.toObject() : { ...user };

  delete obj.passwordHash;
  delete obj.otp;
  delete obj.otpExpiresAt;
  delete obj.refreshTokenHash;

  return obj;
};
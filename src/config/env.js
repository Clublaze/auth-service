import dotenv from "dotenv";

dotenv.config();

export const env = {
  // Server
  port: Number(process.env.PORT) || 8001,
  nodeEnv: process.env.NODE_ENV || "development",

  // Database
  mongoUri: process.env.MONGO_URI,

  // JWT
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES || "15m",
  refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES || "7d",
  jwtIssuer: process.env.JWT_ISSUER || "unihub-auth-service",

  // Email
  emailVerifyRedirectUrl: process.env.EMAIL_VERIFY_REDIRECT_URL,
  passwordResetRedirectUrl: process.env.PASSWORD_RESET_REDIRECT_URL,

  // AWS SES
  awsRegion: process.env.AWS_REGION,
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  sesEmail: process.env.SES_SENDER_EMAIL,
};

import dotenv from "dotenv";

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 4000,

  // Database
  mongoUri: process.env.MONGO_URI,

  // JWT
  accessTokenSecret: process.env.JWT_ACCESS_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m",
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d",
  jwtIssuer: process.env.JWT_ISSUER || "auth-service",

  // Frontend
  frontendBaseUrl: process.env.FRONTEND_BASE_URL,

  // Email redirects
  emailVerifyRedirectUrl: process.env.EMAIL_VERIFY_REDIRECT_URL,
  passwordResetRedirectUrl: process.env.PASSWORD_RESET_REDIRECT_URL,

  // AWS SES
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sesSenderEmail: process.env.SES_SENDER_EMAIL,
  },
};

if (!env.accessTokenSecret || !env.refreshTokenSecret) {
  console.error("JWT secrets are missing in environment variables");
  process.exit(1);
}

export default env;

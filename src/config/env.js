import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 8001,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  awsRegion: process.env.AWS_REGION,
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  sesEmail: process.env.SES_SENDER_EMAIL,
};
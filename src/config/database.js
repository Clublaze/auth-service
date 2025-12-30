import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  try {
    if (!env.mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(env.mongoUri);

    console.log("🟢 MongoDB connected");
  } catch (error) {
    console.error("🔴 MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;

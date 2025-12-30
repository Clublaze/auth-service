import app from "./app.js";
import connectDB from "./config/database.js";
import env from "./config/env.js";

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    app.listen(env.port, () => {
      console.log(`🚀 Auth service running on port ${env.port}`);
      console.log("JWT ACCESS SECRET LOADED:", !!env.accessTokenSecret);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();

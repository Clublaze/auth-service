import app from "./app.js";
import connectDB from "./config/database.js";
import env from "./config/env.js";
import {
  connectKafkaProducer,
  disconnectKafkaProducer,
} from "./messaging/kafka.client.js";

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    await connectKafkaProducer();

    const server = app.listen(env.port, () => {
      console.log(`Auth service running on port ${env.port}`);
      console.log("JWT ACCESS SECRET LOADED:", !!env.accessTokenSecret);
    });

    const shutdown = async () => {
      console.log("Shutting down auth service...");
      server.close(async () => {
        await disconnectKafkaProducer();
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import { securityMiddleware } from "./middleware/security.middleware.js";
import env from "./config/env.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(securityMiddleware);
app.use(
  cors({
    origin: env.frontendBaseUrl,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;

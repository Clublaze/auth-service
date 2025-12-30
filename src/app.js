import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import { securityMiddleware } from "./middleware/security.middleware.js";

const app = express();

app.use(securityMiddleware);
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;

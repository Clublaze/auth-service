import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { securityMiddleware } from "./middleware/security.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(securityMiddleware);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Auth Service is running..." });
});

export default app;
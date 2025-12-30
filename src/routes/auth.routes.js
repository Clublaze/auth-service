import express from "express";
import authController from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
    studentRegisterSchema,
    facultyRegisterSchema,
    loginSchema,
} from "../validations/auth.validation.js";

const router = express.Router();

router.post(
  "/register/student",
  validate(studentRegisterSchema),
  authController.registerStudent
);

router.post(
  "/register/faculty",
  validate(facultyRegisterSchema),
  authController.registerFaculty
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

export default router;

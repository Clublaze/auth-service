import AppError from "../utils/appError.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    next(new AppError(error.errors?.[0]?.message || "Invalid request data", 400));
  }
};

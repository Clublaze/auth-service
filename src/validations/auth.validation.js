import { z } from "zod";

export const studentRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  systemId: z.string(),
});

export const facultyRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

import { z } from "zod";

// Reusable schemas for constraints
export const emailSchema = z
  .string()
  .trim()
  .email({ message: "Invalid email address" })
  .min(1, { message: "Email is required" })
  .max(255, { message: "Email must be less than 255 characters" });

export const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(128, { message: "Password must be less than 128 characters" })
  .regex(/[A-Z]/, {
    message: "Password must include at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must include at least one lowercase letter",
  })
  .regex(/\d/, { message: "Password must include at least one number" })
  .regex(/[!@#$%^&*]/, {
    message: "Password must include at least one special character",
  });

export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: "Name is required" })
  .max(255, { message: "Name must be less than 255 characters" });

export const usernameSchema = z
  .string()
  .trim()
  .min(1, { message: "Username is required" })
  .max(255, { message: "Username must be less than 255 characters" })
  .regex(/^[a-zA-Z0-9_.]+$/, {
    message:
      "Username can only contain letters, numbers, underscores, and dots",
  });

export const verificationCodeSchema = z
  .string()
  .trim()
  .min(1, { message: "Code is required!" })
  .max(25, { message: "Code must be less than 25 characters" });

export const loginPasswordSchema = z.string().trim().min(6).max(255);

// Registration schema
export const registerSchema = z
  .object({
    name: nameSchema,
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
  userAgent: z.string().trim().optional(),
});

// Verification Schema
export const verificationEmailSchema = z.object({
  code: verificationCodeSchema,
});

// Reset Password Schema

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});

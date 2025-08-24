import { z } from "zod";

const createUserValidation = z.object({
  body: z.object({
    displayName: z
      .string()
      .min(2, "Name is required and should be at least 2 characters long"),
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z
      .string()
      .min(6, "Password is required and should be at least 6 characters long"),
  }),
});

const updateUserValidation = createUserValidation.partial();

export const UserValidation = {
  createUserValidation,
  updateUserValidation,
};

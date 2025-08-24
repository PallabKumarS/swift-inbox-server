import { z } from "zod";

const createUserValidation = z.object({
  body: z.object({
    name: z.string().min(2, "Name is required and should be at least 2 characters long"),
  }),
});

const updateUserValidation = createUserValidation.partial();

export const UserValidation = {
  createUserValidation,
  updateUserValidation,
};
import { z } from "zod";

export const userFormValidation = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50, {
      message: "Username must be at not more 50 characters.",
    }),
  email: z.string().email("Invalid  email Address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,50}$/.test(phone), "invalid phone number"),
});

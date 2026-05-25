import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Невірний email"),
  passwordHash: z.string().min(6, "Мінімум 6 символів"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Мінімум 2 символи"),
    email: z.string().email("Невірний email"),
    password: z.string().min(6, "Мінімум 6 символів"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

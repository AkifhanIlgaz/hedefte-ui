import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Şifre en az 8 karakterli olmalı");

export const forgotPasswordSchema = z.object({
  email: z.email().max(255),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  })
  .strict();

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "İsim zorunludur").max(50),
    lastName: z.string().min(1, "Soyad zorunludur").max(50),
    email: z.email("Lütfen geçerli bir e-posta giriniz").max(255),
    password: passwordSchema,
    confirmPassword: z.string().min(8),
    agreeToTerms: z.literal(true, "Kullanım şartlarını kabul etmelisiniz"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  })

  .strict();

export const loginSchema = z
  .object({
    email: z.email().max(255),
    password: passwordSchema,
  })
  .strict();

export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;

import { z } from "zod";
import { passwordSchema } from "./password.validation";

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

  export type RegisterRequest = z.infer<typeof registerSchema>;
  
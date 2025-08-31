import { z } from "zod";
import { passwordSchema } from "./password.validation";

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

export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;

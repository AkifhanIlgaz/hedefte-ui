import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email().max(255),
});

export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;

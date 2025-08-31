import { z } from "zod";
import { passwordSchema } from "./password.validation";

export const loginSchema = z
  .object({
    email: z.email().max(255),
    password: passwordSchema,
  })
  .strict();

export type LoginRequest = z.infer<typeof loginSchema>;


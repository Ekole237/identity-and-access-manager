import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
    ),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

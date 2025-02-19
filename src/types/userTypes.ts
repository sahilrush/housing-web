import { string, z } from "zod";

export const signupSchema = z.object({
  email: z.string(),
  password: z.string(),
  role: z.boolean(),
});

export const signinSchema = z.object({
  email: z.string(),
  password: string(),
});

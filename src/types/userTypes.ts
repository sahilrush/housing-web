
import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.boolean(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  age: z.number(),
  gender: z.string(), 
});


export const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
});

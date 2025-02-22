
import { boolean, z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role:z.string().optional()

}).passthrough();


export const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
});




export const postSchema = z.object({
  id: z.number().int().positive().optional(),
  title: z.string(),
  description:z.string(),
  category:z.string(),
  price:z.number().int(),
  availability:z.boolean(),
  images:z.array(z.string()),
  username:z.string(),
  contactNumber:z.string(),
  email:z.string().email(),
  property: z.object({
    id: z.number().int().positive(),
  }).optional(),
})
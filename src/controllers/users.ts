import { Prisma, PrismaClient } from "@prisma/client";
import { signinSchema, signupSchema } from "../types/userTypes";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const JWTSEC = "123415321323";

export const signup = async (req: Request, res: Response) => {
  try {
    const validateData = signupSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validateData.email },
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(validateData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: validateData.email,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "User created succesfully", user });
    return;
  } catch (err) {
    console.log(err, "internal server error");
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const validateData = signinSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: validateData.email },
    });

    if (!user) {
      res.status(401).json({ error: "user already exists" });
      return;
    }

    const passwordMatch = await bcrypt.compare(
      validateData.password,
      user.password
    );

    if (!passwordMatch) {
      res.status(401).json({ error: "password not matched" });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWTSEC,
      { expiresIn: "1h" }
    );

    res.json({ message: "signin Sucessdull", user, token });
    return;
  } catch (err) {
    console.log(err, "internal server error");
  }
};

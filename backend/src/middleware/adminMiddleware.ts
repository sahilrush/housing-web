import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";
const JWTSEC = "321e432e";

interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
  role: string;
}

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWTSEC) as CustomJwtPayload;
    if (decoded.role !== "ADMIN") {
      res.status(403).json({ message: "Access denied . admin only " });
    }
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};

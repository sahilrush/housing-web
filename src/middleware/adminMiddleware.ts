import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";
const JWTSEC = "321e432e";

interface AuthRequest extends Request {
  userId: string;
}

interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
}

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token as string;
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  const decoded = jwt.verify(token, JWTSEC) as CustomJwtPayload;

  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "You are not signed in",
    });
  }
};

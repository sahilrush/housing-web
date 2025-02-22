"use strict";
// import { NextFunction } from "express";
// import { Request, Response } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// const JWTSEC = "asdk";
// interface AuthRequest extends Request {
//   userId: string;
// }
// interface CustomJwtPayload extends JwtPayload {
//   id: string;
// }
// export const userMiddleware = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers.token as string;
//   if (!token) {
//     res.status(401).json({ message: "No token provided" });
//   }
//   const decoded = jwt.verify(token, JWTSEC) as CustomJwtPayload;
//   if (decoded) {
//     req.userId = decoded.id;
//     next();
//   } else {
//     res.status(403).json({ message: "You are not signed in" });
//   }
// };

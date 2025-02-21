"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWTSEC = "asdk";
const userMiddleware = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ message: "No token provided" });
    }
    const decoded = jsonwebtoken_1.default.verify(token, JWTSEC);
    if (decoded) {
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({ message: "You are not signed in" });
    }
};
exports.userMiddleware = userMiddleware;

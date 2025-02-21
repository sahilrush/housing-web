"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWTSEC = "321e432e";
const adminMiddleware = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    const decoded = jsonwebtoken_1.default.verify(token, JWTSEC);
    if (decoded) {
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not signed in",
        });
    }
};
exports.adminMiddleware = adminMiddleware;

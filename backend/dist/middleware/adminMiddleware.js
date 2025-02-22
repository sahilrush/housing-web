"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWTSEC = "321e432e";
const adminMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWTSEC);
        if (decoded.role !== "ADMIN") {
            res.status(403).json({ message: "Access denied . admin only " });
        }
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
};
exports.adminMiddleware = adminMiddleware;

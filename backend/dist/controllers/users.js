"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const client_1 = require("@prisma/client");
const userTypes_1 = require("../types/userTypes");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const JWTSEC = "123415321323";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Received data:", req.body);
        const validateData = userTypes_1.signupSchema.parse(req.body);
        const existingUser = yield prisma.user.findUnique({
            where: { email: validateData.email },
        });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(validateData.password, 10);
        const role = req.body.role && req.body.role === "ADMIN" ? "ADMIN" : "CLIENT";
        const user = yield prisma.user.create({
            data: {
                email: validateData.email,
                password: hashedPassword,
                role,
            },
        });
        res.status(200).json({ message: "User created succesfully", user });
        return;
    }
    catch (err) {
        console.log(err, "internal server error");
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateData = userTypes_1.signinSchema.parse(req.body);
        const user = yield prisma.user.findUnique({
            where: { email: validateData.email },
        });
        if (!user) {
            res.status(401).json({ error: "user already exists" });
            return;
        }
        const passwordMatch = yield bcryptjs_1.default.compare(validateData.password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ error: "password not matched" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, JWTSEC, { expiresIn: "1h" });
        res.json({ message: "signin Sucessdull", user, token });
        return;
    }
    catch (err) {
        console.log(err, "internal server error");
    }
});
exports.signin = signin;

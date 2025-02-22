"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.string().optional()
}).passthrough();
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.postSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    category: zod_1.z.string(),
    price: zod_1.z.number().int(),
    availability: zod_1.z.boolean(),
    images: zod_1.z.array(zod_1.z.string()),
    username: zod_1.z.string(),
    contactNumber: zod_1.z.string(),
    email: zod_1.z.string().email(),
    property: zod_1.z.object({
        id: zod_1.z.number().int().positive(),
    }).optional(),
});

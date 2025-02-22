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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.deletPost = exports.brokerPost = void 0;
const client_1 = require("@prisma/client");
const userTypes_1 = require("../types/userTypes");
const prisma = new client_1.PrismaClient();
const brokerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateData = userTypes_1.postSchema.parse(req.body);
        const newPost = yield prisma.broker.create({
            data: {
                title: validateData.title,
                description: validateData.description,
                category: validateData.category,
                price: validateData.price,
                availability: validateData.availability,
                images: validateData.images,
                username: validateData.username,
                contactNumber: validateData.contactNumber,
                email: validateData.email,
                property: validateData.property
                    ? { connect: { id: validateData.property.id } }
                    : undefined,
            },
        });
        res.status(200).json({ message: "post created", newPost });
        return;
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
});
exports.brokerPost = brokerPost;
const deletPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = Number(req.params.id);
        if (isNaN(postId)) {
            res.status(400).json({ error: "invalid post id" });
        }
        const existingPost = yield prisma.broker.findUnique({
            where: { id: postId },
        });
        if (!existingPost) {
            res.status(404).json({ error: "Post not found" });
        }
        yield prisma.broker.delete({
            where: { id: postId },
        });
        res.status(200).json({ message: "deleted Successfullh" });
        return;
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
exports.deletPost = deletPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateData = userTypes_1.postSchema.parse(req.body);
        const updatePost = yield prisma.broker.update({
            where: { id: Number(req.params.id) },
            data: {
                title: validateData.title,
                description: validateData.description,
                category: validateData.category,
                price: validateData.price,
                availability: validateData.availability,
                images: validateData.images,
                username: validateData.username,
                contactNumber: validateData.contactNumber,
                email: validateData.email,
                property: validateData.property
                    ? { connect: { id: validateData.property.id } }
                    : undefined,
            },
        });
        res.status(200).json({ message: "Post updated", updatePost });
        return;
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
exports.updatePost = updatePost;

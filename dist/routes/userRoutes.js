"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", users_1.signup);
userRouter.post("/signin", users_1.signin);
exports.default = userRouter;

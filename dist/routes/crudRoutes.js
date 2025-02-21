"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crud_1 = require("../controllers/crud");
const crudRouter = (0, express_1.Router)();
crudRouter.post('/createPost', crud_1.brokerPost);
crudRouter.delete('/deletePost', crud_1.deletPost);
crudRouter.put('/updatePost', crud_1.updatePost);
exports.default = crudRouter;

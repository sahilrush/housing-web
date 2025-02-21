"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const crudRoutes_1 = __importDefault(require("./routes/crudRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use("/auth", userRoutes_1.default);
app.use("/v1", crudRoutes_1.default);
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`server is runnning on ${PORT}`));

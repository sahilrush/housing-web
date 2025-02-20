import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/userRoutes";
const app = express();
app.use(bodyParser.json());

app.use(express.json());

app.use("/auth", userRouter);
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => console.log(`server is runnning on ${PORT}`));

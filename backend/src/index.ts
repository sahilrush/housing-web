import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/userRoutes";
import crudRouter from "./routes/crudRoutes";
import cors from "cors";

const app = express();
app.use(cors({
  origin:"http://localhost:3000",
}))


app.use(bodyParser.json());

app.use(express.json());

app.use("/auth", userRouter); 
app.use("/v1", crudRouter)

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => console.log(`server is runnning on ${PORT}`));

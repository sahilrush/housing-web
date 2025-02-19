import bodyParser from "body-parser";
import express from "express";
const app = express();
app.use(bodyParser.json());

app.use(express.json());

const PORT = 3000;

app.listen(PORT);

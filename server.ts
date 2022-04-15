import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
// import "./apiDoc";
import router from "./router/router";
import mongoose from "mongoose";
import cors from "cors";

mongoose.connect("mongodb://127.0.0.1:27017/wish-list", {});
const swaggerFile = JSON.parse(
  fs.readFileSync("./output.json", { encoding: "utf-8" })
);
dotenv.config();

const app = express();
const port = 4000;
app.use(cors("*"));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/", router);

app.listen(port, () => console.log(`Running on port ${port}`));

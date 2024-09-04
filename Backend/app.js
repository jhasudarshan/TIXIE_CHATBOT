import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import path from 'path';
import authRoute from "./src/routes/auth.routes.js";

dotenv.config({
    path: '.env'
})
const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRoute);

export {
    app,
    __dirname
}
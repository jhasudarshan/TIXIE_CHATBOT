import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
// import handleChat from './src/controller/chatbot.js';
//import user from "./src/routes/auth.routes.js";

dotenv.config({
    path: './backend/.env'
})

const app = express();

app.use(express.json());
app.use(cookieParser());

// handleChat("hello",'3847');
//app.use("/api/v1", user);

export default app;
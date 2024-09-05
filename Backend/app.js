import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import path from 'path';
import authRoute from "./src/routes/auth.routes.js";
import chatRoute from "./src/routes/chat.routes.js";
import adminRoute from "./src/routes/admin.routes.js";
import cors from 'cors';

dotenv.config({
    path: '.env'
})
const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", authRoute);
app.use("/api/v1",chatRoute);
app.use("/api/v1",adminRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

export {
    app,
    __dirname
}
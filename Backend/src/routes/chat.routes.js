import { Router } from "express";
import handleChat from "../controller/chatbot.controller.js";

const router = Router();

router.post("/chat_bot",handleChat);

export default router;
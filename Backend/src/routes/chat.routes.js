import { Router } from "express";
import handleChat from "../controller/chatbot.controller.js";
import validateRoute2 from '../middleware/validateRoute2.js'
const router = Router();

router.post("/chat_bot",validateRoute2,handleChat);

export default router;
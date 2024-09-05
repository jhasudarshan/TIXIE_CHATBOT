import { Router } from "express";
import { addMuseumDetail, addshowDetails, addTicketDetails } from "../controller/admin.controller.js";

const router = Router();

router.post('/addShow',addshowDetails);
router.post("/addTicket",addTicketDetails);

export default router;
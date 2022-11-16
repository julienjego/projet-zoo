import express from "express";
import eventController from "../controllers/event";

const router = express.Router();

router.get("/enclosure/:id", eventController.getEventsByEnclosure);

export default router;

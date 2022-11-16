import express from "express";
import eventController from "../controllers/event";

const router = express.Router();

router.get("/enclosure/:id", eventController.getEventsByEnclosure);
router.get("/species/:id", eventController.getEventsBySpecies);

export default router;

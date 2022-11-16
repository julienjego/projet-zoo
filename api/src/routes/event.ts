import express from "express";
import eventController from "../controllers/event";

const router = express.Router();

router.get("/enclosure/:id", eventController.getEventsByEnclosure);
router.get("/species/:id", eventController.getEventsBySpecies);
router.get("/animals/:id", eventController.getEventsByAnimal);

export default router;

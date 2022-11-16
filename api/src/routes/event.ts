import express from "express";
import eventController from "../controllers/event";

const router = express.Router();

router.put("/create", eventController.createEvent);
router.get("/enclosures/:id", eventController.getEventsByEnclosure);
router.get("/species/:id", eventController.getEventsBySpecies);
router.get("/animals/:id", eventController.getEventsByAnimal);
router.get("/zones/:id", eventController.getEventsByZone);

export default router;

import express from "express";
import eventController from "../controllers/event";
import auth from "../middlewares/auth";

const router = express.Router();

router.put(
    "/create",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE"]),
    eventController.createEvent
);
router.get("/enclosures/:id", eventController.getEventsByEnclosure);
router.get("/species/:id", eventController.getEventsBySpecies);
router.get("/animals/:id", eventController.getEventsByAnimal);
router.get("/zones/:id", eventController.getEventsByZone);

export default router;

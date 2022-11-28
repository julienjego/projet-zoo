import express from "express";
import eventController from "../controllers/event";
import auth from "../middlewares/auth";

const router = express.Router();

router.put(
    "/create",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE"]),
    eventController.createEvent
);

router.get(
    "/enclosures/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE"]),
    eventController.getEventsByEnclosure
);

router.get(
    "/species/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE"]),
    eventController.getEventsBySpecies
);

router.get("/animals/:id", eventController.getEventsByAnimal);

router.get(
    "/zones/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE"]),
    eventController.getEventsByZone
);

export default router;

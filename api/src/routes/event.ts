import express from "express";
import eventController from "../controllers/event";
import auth from "../middlewares/auth";

const router = express.Router();

router.put(
    "/create",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "ADMIN"]),
    eventController.createEvent
);

router.get(
    "/enclosures/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "ADMIN"]),
    eventController.getEventsByEnclosure
);

router.get(
    "/species/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "ADMIN"]),
    eventController.getEventsBySpecies
);

router.get(
    "/animals/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "ADMIN"]),
    eventController.getEventsByAnimal
);

router.get(
    "/zones/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "ADMIN"]),
    eventController.getEventsByZone
);

export default router;

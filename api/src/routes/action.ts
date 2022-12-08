import express from "express";
import actionController from "../controllers/action";
import auth from "../middlewares/auth";

const router = express.Router();

router.put(
    "/create",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "ADMIN"]),
    actionController.createAction
);

router.delete(
    "/delete/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "ADMIN"]),
    actionController.deleteAction
);

router.get(
    "/zones/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR", "ADMIN"]),
    actionController.getActionsByZone
);

router.get(
    "/enclosures/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR", "ADMIN"]),
    actionController.getActionsByEnclosure
);

router.get(
    "/species/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR", "ADMIN"]),
    actionController.getActionsBySpecies
);

router.get(
    "/animals/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR", "ADMIN"]),
    actionController.getActionsByAnimal
);

export default router;

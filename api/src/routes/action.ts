import express from "express";
import actionController from "../controllers/action";
import auth from "../middlewares/auth";

const router = express.Router();

router.put(
    "/create",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE"]),
    actionController.createAction
);

router.get(
    "/zones/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR"]),
    actionController.getActionsByZone
);

router.get(
    "/enclosures/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR"]),
    actionController.getActionsByEnclosure
);

router.get(
    "/species/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR"]),
    actionController.getActionsBySpecies
);

router.get(
    "/animals/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR"]),
    actionController.getActionsByAnimal
);

export default router;

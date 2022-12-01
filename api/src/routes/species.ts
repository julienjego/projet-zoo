import express from "express";
import speciesController from "../controllers/species";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/:id/animals", speciesController.getAnimalsBySpecies);

router.get("/", speciesController.getSpecies);

router.get("/:id", speciesController.getASpecies);

router.post(
    "/in/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR", "ADMIN"]),
    speciesController.moveSpecies
);

router.post(
    "/out/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR", "ADMIN"]),
    speciesController.moveSpecies
);

router.post(
    "/feed/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR", "ADMIN"]),
    speciesController.feedSpecies
);

router.post(
    "/stimulate/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR", "ADMIN"]),
    speciesController.stimulateSpecies
);

export default router;

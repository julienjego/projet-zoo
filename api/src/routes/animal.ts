import express from "express";
import animalController from "../controllers/animal";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", animalController.getAllAnimals);

router.get("/:id", animalController.getAnAnimal);

router.get("/:id/enclosure", animalController.getAnimalEnclosure);

router.get("/enclosures/:id", animalController.getAllAnimalsByEnclosure);

router.post(
    "/",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "ADMIN"]),
    animalController.createAnimal
);

router.post(
    "/out/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR", "ADMIN"]),
    animalController.moveAnimal
);

router.post(
    "/in/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "SOIGNEUR", "ADMIN"]),
    animalController.moveAnimal
);

router.put(
    "/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "ADMIN"]),
    animalController.updateAnimal
);

router.delete(
    "/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "ADMIN"]),
    animalController.deleteAnimal
);

router.post(
    "/care/:id",
    auth.verifyToken,
    auth.verifyRole(["VETERINAIRE", "ADMIN"]),
    animalController.careAnimal
);

export default router;

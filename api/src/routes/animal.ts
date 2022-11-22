import express from "express";
import animalController from "../controllers/animal";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/", animalController.createAnimal);
router.post("/out/:id", animalController.moveAnimal);
router.post("/in/:id", animalController.moveAnimal);
router.get(
    "/",
    auth.verifyToken,
    auth.verifyRole(["ADMIN"]),
    animalController.getAllAnimals
);
router.get("/:id", animalController.getAnAnimal);
router.get("/:id/enclosure", animalController.getAnimalEnclosure);
router.put("/:id", animalController.updateAnimal);
router.delete("/:id", animalController.deleteAnimal);
router.post("/care/:id", animalController.careAnimal);

export default router;

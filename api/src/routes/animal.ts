import express, { Request, Response } from "express";
import animalController from "../controllers/animal";

const router = express.Router();

router.post("/", animalController.createAnimal);
router.get("/", animalController.getAllAnimals);
router.get("/:id", animalController.getAnAnimal);
router.put("/:id", animalController.updateAnimal);
router.delete("/:id", animalController.deleteAnimal);

export default router;

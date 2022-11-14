import express from "express";
import speciesController from "../controllers/species";

const router = express.Router();

router.get("/:id/animals", speciesController.getAnimalsBySpecies);
router.post("/in/:id", speciesController.moveSpecies);
router.post("/out/:id", speciesController.moveSpecies);

export default router;

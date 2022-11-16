import express from "express";
import speciesController from "../controllers/species";

const router = express.Router();

router.get("/:id/animals", speciesController.getAnimalsBySpecies);
router.post("/in/:id", speciesController.moveSpecies);
router.post("/out/:id", speciesController.moveSpecies);
router.post("/feed/:id", speciesController.feedSpecies);
router.post("/stimulate/:id", speciesController.stimulateSpecies);

export default router;

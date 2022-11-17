import express from "express";
import actionController from "../controllers/action";

const router = express.Router();

router.put("/create", actionController.createAction);
router.get("/zones/:id", actionController.getActionsByZone);
router.get("/enclosures/:id", actionController.getActionsByEnclosure);
router.get("/species/:id", actionController.getActionsBySpecies);
router.get("/animals/:id", actionController.getActionsByAnimal);

export default router;

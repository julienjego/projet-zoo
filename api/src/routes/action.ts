import express from "express";
import actionController from "../controllers/action";
import auth from "../middlewares/auth";

const router = express.Router();

router.put(
    "/create",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE"]),
    actionController.createAction
);
router.get("/zones/:id", actionController.getActionsByZone);
router.get("/enclosures/:id", actionController.getActionsByEnclosure);
router.get("/species/:id", actionController.getActionsBySpecies);
router.get("/animals/:id", actionController.getActionsByAnimal);

export default router;

import express from "express";
import actionController from "../controllers/action";

const router = express.Router();

router.put("/create", actionController.createAction);
router.get("/zones/:id", actionController.getActionsByZone);

export default router;

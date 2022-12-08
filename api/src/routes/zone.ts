import express from "express";
import zoneController from "../controllers/zone";

const router = express.Router();

router.get("/", zoneController.getZones);

router.get("/:id", zoneController.getAZone);

export default router;

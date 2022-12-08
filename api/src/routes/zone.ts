import express from "express";
import zoneController from "../controllers/zone";

const router = express.Router();

router.get("/", zoneController.getZones);

router.get("/:id", zoneController.getAZone);

router.get("/:id/enclosures", zoneController.getEnclosuresByZone);

export default router;

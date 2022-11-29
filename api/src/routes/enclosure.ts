import express from "express";
import enclosureController from "../controllers/enclosure";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", enclosureController.getEnclosures);

router.get("/:id", enclosureController.getAnEnclosure);

router.post(
    "/verify/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE", "ADMIN"]),
    enclosureController.verifyEnclosure
);

export default router;

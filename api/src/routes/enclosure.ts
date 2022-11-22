import express from "express";
import enclosureController from "../controllers/enclosure";
import auth from "../middlewares/auth";

const router = express.Router();

router.post(
    "/verify/:id",
    auth.verifyToken,
    auth.verifyRole(["RESPONSABLE-ZONE", "VETERINAIRE"]),
    enclosureController.verifyEnclosure
);

export default router;

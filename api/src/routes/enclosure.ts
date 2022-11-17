import express from "express";
import enclosureController from "../controllers/enclosure";

const router = express.Router();

router.post("/verify/:id", enclosureController.verifyEnclosure);

export default router;

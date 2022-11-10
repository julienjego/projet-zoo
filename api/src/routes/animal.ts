import express, { Request, Response } from "express";
import animalController from "../controllers/animal";

const router = express.Router();

router.get("/", animalController.getAllAnimals);

export default router;

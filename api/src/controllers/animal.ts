import Animal from "../models/animal";
import { NextFunction, Request, Response } from "express";

const getAllAnimals = (req: Request, res: Response, next: NextFunction) => {
    Animal.find()
        .then((animals) => res.status(200).json(animals))
        .catch((error) => res.status(400).json({ error }));
};

export default { getAllAnimals };

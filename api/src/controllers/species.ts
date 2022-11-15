import Species from "../models/species";
import Animal from "../models/animal";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const getAnimalsBySpecies = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Species.findById(req.params.id).then((species) => {
        if (species) {
            Animal.find({ espece: species.nom })
                .then((animals) => res.status(200).json(animals))
                .catch((error) => res.status(404).json({ error }));
        } else {
            console.log("brr");
        }
    });
};

const moveSpecies = (req: Request, res: Response, next: NextFunction) => {};

export default { getAnimalsBySpecies, moveSpecies };

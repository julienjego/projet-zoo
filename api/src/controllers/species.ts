import Species from "../models/species";
import Animal from "../models/animal";
import { NextFunction, Request, Response } from "express";

const getAnimalsBySpecies = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(req.params.id);
    const species = Species.findById(req.params.id).then((species) => {
        if (species) {
            console.log(species.nom);
        } else {
            console.log("brr");
        }
    });
};

const moveSpecies = (req: Request, res: Response, next: NextFunction) => {};

export default { getAnimalsBySpecies, moveSpecies };

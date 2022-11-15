import Species from "../models/species";
import Animal from "../models/animal";
import { NextFunction, Request, Response } from "express";

const getAnimalsBySpecies = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Species.findById(req.params.id)
        .then((species) => {
            if (species) {
                Animal.find({ espece: species.nom })
                    .then((animals) => res.status(200).json(animals))
                    .catch((error) => res.status(404).json({ error }));
            } else {
                res.status(404).json({ message: "Animaux introuvable" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

const moveSpecies = (req: Request, res: Response, next: NextFunction) => {};

export default { getAnimalsBySpecies, moveSpecies };

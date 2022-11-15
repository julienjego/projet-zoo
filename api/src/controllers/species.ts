import Species from "../models/species";
import Animal from "../models/animal";
import logger from "../utils/log";
import { NextFunction, Request, Response } from "express";

// Récupérer tous les animaux d'une espèce
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
                res.status(404).json({ message: "Animaux introuvables" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

// Faire sortir ou rentrer tous les animaux d'une espèce
const moveSpecies = (req: Request, res: Response, next: NextFunction) => {
    Species.findById(req.params.id).then((species) => {
        if (species) {
            const url = req.url;

            Animal.find({ espece: species.nom })
                .then((animals) => {
                    if (animals) {
                        Animal.updateMany(
                            { espece: species.nom },
                            url.includes("/out/")
                                ? { $set: { position: "dehors" } }
                                : { $set: { position: "dedans" } }
                        )
                            .then(() => {
                                res.status(202).json(
                                    url.includes("/out/")
                                        ? { message: "Animaux sortis !" }
                                        : { message: "Animaux rentrés !" }
                                );
                            })
                            .catch((error) => res.status(400).json({ error }));
                    } else {
                        console.log("Animaux inconnus");
                    }
                })
                .catch((error) => res.status(404).json({ error }));
        }
    });
};

// Nourrir les animaux d'une espèce
const feedSpecies = (req: Request, res: Response, next: NextFunction) => {
    Species.findById(req.params.id)
        .then((species) => {
            if (species) {
                Animal.find({ espece: species.nom })
                    .then((animals) => {
                        if (animals) {
                            res.status(200).json({
                                message: `Animaux [${species.nom}] nourris !`,
                            });
                            logger.logEvents(
                                species.enclos,
                                species.nom,
                                animals.map((animal) => animal.nom),
                                "nourissage",
                                "RAS"
                            );
                        } else {
                            res.status(404).json({
                                message: "Pas d'animaux à nourrir",
                            });
                        }
                    })
                    .catch((error) => res.status(400).json({ error }));
            } else {
                res.status(404).json({ message: "Animaux introuvables" });
            }
        })
        .catch((error) => res.status(404).json({ error }));
};

export default { getAnimalsBySpecies, moveSpecies, feedSpecies };

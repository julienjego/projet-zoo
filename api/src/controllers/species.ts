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
            const notMoving: string[] | null = req.body.notMoving;

            console.log(notMoving);
            // TODO remove not moving animals from log
            Animal.find({ espece: species.nom })
                .then((animals) => {
                    if (animals) {
                        Animal.updateMany(
                            { espece: species.nom, _id: { $nin: notMoving } },
                            url.includes("/out/")
                                ? (logger.logEvent(
                                      species.enclos,
                                      species.nom,
                                      animals.map((animal) => animal.nom),
                                      "sortie",
                                      req.body.observations
                                  ),
                                  { $set: { position: "dehors" } })
                                : (logger.logEvent(
                                      species.enclos,
                                      species.nom,
                                      animals.map((animal) => animal.nom),
                                      "entree",
                                      req.body.observations
                                  ),
                                  { $set: { position: "dedans" } })
                        )
                            .then(() => {
                                res.status(202).json(
                                    url.includes("/out/")
                                        ? { message: "Animaux sortis !" }
                                        : { message: "Animaux rentrés !" }
                                );
                            })
                            .catch((error) => res.status(400).json({ error }))
                            .finally(() => {
                                console.log("finally");
                                console.log(animals);
                            });
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
                            // Log de l'événement
                            logger.logEvent(
                                species.enclos,
                                species.nom,
                                animals.map((animal) => animal.nom),
                                "nourissage",
                                req.body.observations
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

// Stimulation des animaux d'une espèce
const stimulateSpecies = (req: Request, res: Response, next: NextFunction) => {
    Species.findById(req.params.id)
        .then((species) => {
            if (species) {
                Animal.find({ espece: species.nom })
                    .then((animals) => {
                        if (animals) {
                            res.status(200).json({
                                message: `Animaux [${species.nom}] stimulés !`,
                            });
                            // Log de l'événement
                            logger.logEvent(
                                species.enclos,
                                species.nom,
                                animals.map((animal) => animal.nom),
                                "stimulation",
                                req.body.observations
                            );
                        } else {
                            res.status(404).json({
                                message: "Pas d'animaux à stimuler",
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

export default {
    getAnimalsBySpecies,
    moveSpecies,
    feedSpecies,
    stimulateSpecies,
};

import Species from "../models/species";
import Animal from "../models/animal";
import logger from "../utils/log";
import { NextFunction, Request, Response } from "express";

// Récupère toutes les espèces

const getSpecies = (req: Request, res: Response, next: NextFunction) => {
    Species.find()
        .then((species) => res.status(200).json(species))
        .catch((error) => res.status(404).json({ error }));
};

const getASpecies = (req: Request, res: Response, next: NextFunction) => {
    Species.findById(req.params.id)
        .then((specie) => res.status(200).json(specie))
        .catch((error) => res.status(404).json({ error }));
};

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
            const url: string = req.url;
            const notMoving: string[] | null = req.body.notMoving;
            let inOut: string;
            Animal.find({ espece: species.nom })
                .then((animals) => {
                    if (animals) {
                        Animal.updateMany(
                            { espece: species.nom, _id: { $nin: notMoving } },
                            url.includes("/out/")
                                ? ((inOut = "out"),
                                  { $set: { position: "dehors" } })
                                : ((inOut = "in"),
                                  { $set: { position: "dedans" } })
                        )
                            .then(() => {
                                res.status(202).json(
                                    url.includes("/out/")
                                        ? { message: "Animaux sortis !" }
                                        : { message: "Animaux rentrés !" }
                                );

                                // Log uniquement les animaux entrés ou sortis
                                if (inOut === "in") {
                                    Animal.find({
                                        espece: species.nom,
                                        position: { $eq: "dedans" },
                                    }).then((animals) => {
                                        logger.logEvent(
                                            res.locals.jwt.username,
                                            species.enclos,
                                            species.nom,
                                            animals.map((animal) => animal.nom),
                                            "entree",
                                            req.body.observations
                                        );
                                    });
                                } else {
                                    Animal.find({
                                        espece: species.nom,
                                        position: { $eq: "dehors" },
                                    }).then((animals) => {
                                        logger.logEvent(
                                            res.locals.jwt.username,
                                            species.enclos,
                                            species.nom,
                                            animals.map((animal) => animal.nom),
                                            "sortie",
                                            req.body.observations
                                        );
                                    });
                                }
                            })
                            .catch((error) => res.status(400).json({ error }));
                    } else {
                        res.status(404).json({
                            message: "Animaux introuvables",
                        });
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
                                res.locals.jwt.username,
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
                                res.locals.jwt.username,
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
    getSpecies,
    getASpecies,
    getAnimalsBySpecies,
    moveSpecies,
    feedSpecies,
    stimulateSpecies,
};

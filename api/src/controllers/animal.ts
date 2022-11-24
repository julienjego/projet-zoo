import Animal from "../models/animal";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import logger from "../utils/log";

// Créer un animal
const createAnimal = (req: Request, res: Response, next: NextFunction) => {
    const animalObject: typeof Animal = req.body;
    const animal = new Animal({
        ...animalObject,
    });

    animal
        .save()
        .then(() => {
            res.status(201).json({ message: "Animal enregistré !" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Rentrer ou sortir un animal
const moveAnimal = (req: Request, res: Response, next: NextFunction) => {
    const url = req.url;
    let inOut: string;
    Animal.findById({ _id: req.params.id })
        .then((animal) => {
            if (animal) {
                Animal.updateOne(
                    { _id: req.params.id },
                    url.includes("/out/")
                        ? ((inOut = "out"), { $set: { position: "dehors" } })
                        : ((inOut = "in"), { $set: { position: "dedans" } })
                )
                    .then(() => {
                        res.status(202).json(
                            url.includes("/out/")
                                ? { message: "Animal sorti !" }
                                : { message: "Animal rentré !" }
                        );
                        console.log(animal.position);

                        // Log l'animal entré ou sorti
                        Animal.findById({ _id: req.params.id }).then(
                            (animal) => {
                                if (animal) {
                                    logger.logEvent(
                                        res.locals.jwt.username,
                                        "enclos",
                                        animal.espece,
                                        animal.nom,
                                        inOut === "in" ? "entree" : "sortie",
                                        req.body.observations
                                    );
                                }
                            }
                        );
                    })
                    .catch((error) => res.status(400).json({ error }));
            } else {
                res.status(404).json({ message: "Animal inconnu" });
            }
        })
        .catch((error) => res.status(404).json({ error }));
};

// Récupérer un animal par son Id
const getAnAnimal = (req: Request, res: Response, next: NextFunction) => {
    Animal.findById({ _id: req.params.id })
        .then((animal) => res.status(200).json(animal))
        .catch((error) => res.status(404).json({ error }));
};

// Récupérer tous les animaux
const getAllAnimals = (req: Request, res: Response, next: NextFunction) => {
    Animal.find()
        .then((animals) => res.status(200).json(animals))
        .catch((error) => res.status(404).json({ error }));
};

// Connaître l'enclos d'un animal
const getAnimalEnclosure = (req: Request, res: Response) => {
    Animal.findById({ _id: req.params.id })
        .then((animal) => {
            if (animal) {
                Animal.aggregate([
                    {
                        $match: {
                            _id: new mongoose.Types.ObjectId(req.params.id),
                        },
                    },
                    {
                        $lookup: {
                            from: "species",
                            localField: "espece",
                            foreignField: "nom",
                            as: "speciesResult",
                        },
                    },
                    {
                        $unwind: {
                            path: "$speciesResult",
                        },
                    },
                    {
                        $project: {
                            enclos: "$speciesResult.enclos",
                        },
                    },
                    {
                        $lookup: {
                            from: "enclosures",
                            localField: "enclos",
                            foreignField: "nom",
                            as: "enclosuresResult",
                        },
                    },
                    {
                        $unwind: {
                            path: "$enclosuresResult",
                        },
                    },
                    {
                        $project: {
                            enclos: "$enclosuresResult.nomApp",
                        },
                    },
                ]).exec((err, result) => {
                    res.status(200).json(result);
                });
            } else {
                res.status(404).json({ message: "Animal non trouvé" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

// Soigner un animal
const careAnimal = (req: Request, res: Response, next: NextFunction) => {
    Animal.findById({ _id: req.params.id })
        .then((animal) => {
            if (animal) {
                res.status(200).json({ message: `${animal.nom} soigné` });
                logger.logEvent(
                    res.locals.jwt.username,
                    "enclos",
                    animal.espece,
                    animal.nom,
                    "soins",
                    req.body.observations
                );
            } else {
                res.status(404).json({ message: "Animal non trouvé" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

// Mettre à jour un animal
const updateAnimal = (req: Request, res: Response, next: NextFunction) => {
    Animal.findById({ _id: req.params.id }).then((animal) => {
        if (animal) {
            animal.set(req.body);
            animal
                .save()
                .then(() => {
                    res.status(202).json({
                        message: "Animal modifié !",
                    });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
        } else {
            res.status(404).json({ message: "Animal not found" });
        }
    });
};

// Supprimer un animal
const deleteAnimal = (req: Request, res: Response, next: NextFunction) => {
    Animal.findById({ _id: req.params.id }).then((animal) => {
        if (animal) {
            Animal.deleteOne({ _id: req.params.id })
                .then(() => {
                    res.status(410).json({
                        message: "Animal supprimé !",
                    });
                })
                .catch((error) => res.status(400).json({ error }));
        } else {
            res.status(404).json({ message: "Animal not found" });
        }
    });
};

export default {
    createAnimal,
    getAllAnimals,
    getAnAnimal,
    updateAnimal,
    deleteAnimal,
    moveAnimal,
    getAnimalEnclosure,
    careAnimal,
};

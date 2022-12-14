import Zone from "../models/zone";
import Animal from "../models/animal";
import Enclosure from "../models/enclosure";
import Species from "../models/species";
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
    Animal.findByIdAndUpdate(
        req.params.id,
        url.includes("/out/")
            ? ((inOut = "out"), { $set: { position: "dehors" } })
            : ((inOut = "in"), { $set: { position: "dedans" } }),
        { returnOriginal: false }
    )
        .then((animal) => {
            if (animal) {
                res.status(202).json(
                    url.includes("/out/")
                        ? { message: "Animal sorti !", animal: animal }
                        : { message: "Animal rentré !", animal: animal }
                );

                // Log l'animal entré ou sorti
                Animal.findById({ _id: req.params.id }).then((animal) => {
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
                });
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

// Récupérer tous les animaux d'un enclos
const getAllAnimalsByEnclosure = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Enclosure.findById({ _id: req.params.id })
        .then((enclosure) => {
            if (enclosure) {
                let speciesNames: Object[] = [];
                Species.find({ enclos: enclosure.nom })
                    .then((species) => {
                        species.forEach((s) => {
                            speciesNames.push({ espece: s.nom });
                        });
                        Animal.find({ $or: speciesNames })
                            .then((animals) => {
                                res.status(200).json(animals);
                            })
                            .catch((error) => res.status(400).json({ error }));
                    })
                    .catch((error) => res.status(400).json({ error }));
            } else {
                res.status(404).json({ message: "Enclos inconnu" });
            }
        })
        .catch((error) => res.status(404).json({ error }));
};

// Récupérer tous les animaux d'une zone
const getAllAnimalsByZone = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Zone.findById({ _id: req.params.id })
        .then((zone) => {
            if (zone) {
                let enclosuresNames: Object[] = [];
                let speciesNames: Object[] = [];
                Enclosure.find({ zone: zone.nom })
                    .then((enclosures) => {
                        enclosures.forEach((e) => {
                            enclosuresNames.push({ enclos: e.nom });
                        });
                        Species.find({ $or: enclosuresNames })
                            .then((species) => {
                                species.forEach((s) => {
                                    speciesNames.push({ espece: s.nom });
                                });
                                Animal.find({ $or: speciesNames })
                                    .then((animals) => {
                                        res.status(200).json(animals);
                                    })
                                    .catch((error) =>
                                        res.status(400).json({ error })
                                    );
                            })
                            .catch((error) => res.status(400).json({ error }));
                    })
                    .catch((error) => res.status(400).json({ error }));
            } else {
                res.status(404).json({ message: "Zone inconnue" });
            }
        })
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
                            nom: 1,
                            espece: 1,
                            sexe: 1,
                            observations: 1,
                            position: 1,
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
                            nom: 1,
                            espece: 1,
                            sexe: 1,
                            observations: 1,
                            position: 1,
                            enclos: "$enclosuresResult.nomApp",
                            enclosApp: "$enclosuresResult.nom",
                            enclosId: "$enclosuresResult._id",
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

// Connaître l'id de l'espèce d'un animal
const getSpeciesOfAnimal = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
                            as: "results",
                        },
                    },
                    {
                        $unwind: {
                            path: "$results",
                        },
                    },
                    {
                        $project: {
                            espece: 1,
                            especeId: "$results._id",
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
    getAllAnimalsByEnclosure,
    getAllAnimalsByZone,
    getSpeciesOfAnimal,
    updateAnimal,
    deleteAnimal,
    moveAnimal,
    getAnimalEnclosure,
    careAnimal,
};

import Animal from "../models/animal";
import Species from "../models/species";
import Enclosure from "../models/enclosure";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

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

const moveAnimal = (req: Request, res: Response, next: NextFunction) => {
    const url = req.url;

    Animal.findOne({ _id: req.params.id })
        .then((animal) => {
            if (animal) {
                Animal.updateOne(
                    { _id: req.params.id },
                    url.includes("/out/")
                        ? { $set: { position: "dehors" } }
                        : { $set: { position: "dedans" } }
                )
                    .then(() => {
                        res.status(202).json(
                            url.includes("/out/")
                                ? { message: "Animal sorti !" }
                                : { message: "Animal rentré !" }
                        );
                    })
                    .catch((error) => res.status(400).json({ error }));
            } else {
                console.log("Animal inconnu");
            }
        })
        .catch((error) => res.status(404).json({ error }));
};

const getAnAnimal = (req: Request, res: Response, next: NextFunction) => {
    Animal.findOne({ _id: req.params.id })
        .then((animal) => res.status(200).json(animal))
        .catch((error) => res.status(404).json({ error }));
};

const getAllAnimals = (req: Request, res: Response, next: NextFunction) => {
    Animal.find()
        .then((animals) => res.status(200).json(animals))
        .catch((error) => res.status(404).json({ error }));
};

const getAnimalEnclosure = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Animal.findOne({ _id: req.params.id })
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
                            naissance: 1,
                            deces: 1,
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
                            naissance: 1,
                            deces: 1,
                            sexe: 1,
                            observations: 1,
                            position: 1,
                            enclos: "$enclosuresResult.nomApp",
                        },
                    },
                ]).exec((err, results) => {
                    res.status(200).json(results);
                });
            } else {
                res.status(404).json({ message: "Animal non trouvé" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

const updateAnimal = (req: Request, res: Response, next: NextFunction) => {
    Animal.findOne({ _id: req.params.id }).then((animal) => {
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
const deleteAnimal = (req: Request, res: Response, next: NextFunction) => {
    Animal.findOne({ _id: req.params.id }).then((animal) => {
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
};

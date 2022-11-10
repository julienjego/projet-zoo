import Animal from "../models/animal";
import { NextFunction, Request, Response } from "express";

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

// TODO fix getoutanimal

// const getOutAnimal = (req: Request, res: Response, next: NextFunction) => {
//     Animal.findOne({ _id: req.params.id }).then((animal) => {
//         const listingQuery = { _id: req.body.id };
//         const updates = {
//             $set: {
//                 position: "dehors",
//             },
//         };
//         if (animal) {
//             animal.updateOne(listingQuery, updates);

//         } else {
//         }
//     });
// };

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
};

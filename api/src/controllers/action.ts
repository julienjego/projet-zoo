import Action from "../models/action";
import Zone from "../models/zone";
import Enclosure from "../models/enclosure";
import Species from "../models/species";
import Animal from "../models/animal";
import { NextFunction, Request, Response } from "express";

// Création d'une action
const createAction = (req: Request, res: Response, next: NextFunction) => {
    const actionObject: typeof Action = req.body;
    const emp = res.locals.jwt;
    const action = new Action({
        creation: emp.username,
        date: new Date(req.body.date),
        ...actionObject,
    });
    action
        .save()
        .then(() => {
            res.status(201).json({ message: "Action enregistrée !" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

const deleteAction = (req: Request, res: Response, next: NextFunction) => {
    Action.findById({ _id: req.params.id }).then((action) => {
        if (action) {
            Action.deleteOne({ _id: req.params.id })
                .then(() => {
                    res.status(410).json({
                        message: "Action supprimé !",
                    });
                })
                .catch((error) => res.status(400).json({ error }));
        } else {
            res.status(404).json({ message: "Action not found" });
        }
    });
};

//Récupère toutes les actions d'une zone
const getActionsByZone = (req: Request, res: Response, next: NextFunction) => {
    Zone.findById(req.params.id)
        .then((zone) => {
            if (zone) {
                Enclosure.find({ zone: zone.nom }).then((enclos) => {
                    if (enclos) {
                        const listEnclos = enclos.map((e) => ({
                            enclos: e.nom,
                        }));
                        Action.find({ $or: listEnclos })
                            .then((actions) => res.status(200).json(actions))
                            .catch((error) => res.status(404).json({ error }));
                    } else {
                        res.status(404).json({
                            message: "Aucune zone trouvée",
                        });
                    }
                });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

// Récupère toutes les actions d'un enclos
const getActionsByEnclosure = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Enclosure.findById(req.params.id)
        .then((enclosure) => {
            if (enclosure) {
                Action.find({ enclos: enclosure.nom })
                    .then((actions) => res.status(200).json(actions))
                    .catch((error) => res.status(404).json({ error }));
            } else {
                res.status(404).json({ message: "Aucun enclos trouvé" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

// Récupère toutes les actions d'une espèce
const getActionsBySpecies = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Species.findById(req.params.id)
        .then((species) => {
            if (species) {
                Action.find({ espece: species.nom })
                    .then((actions) => res.status(200).json(actions))
                    .catch((error) => res.status(404).json({ error }));
            } else {
                res.status(404).json({ message: "Aucune espèce trouvé" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

// Récupère toutes les actions d'un animal
const getActionsByAnimal = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Animal.findById(req.params.id)
        .then((animal) => {
            if (animal) {
                Action.find({ animal: animal.nom })
                    .then((actions) => res.status(200).json(actions))
                    .catch((error) => res.status(404).json({ error }));
            } else {
                res.status(404).json({ message: "Aucun animal trouvé" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

export default {
    createAction,
    deleteAction,
    getActionsByZone,
    getActionsByEnclosure,
    getActionsBySpecies,
    getActionsByAnimal,
};

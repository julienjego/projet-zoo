import Event from "../models/event";
import Enclosure from "../models/enclosure";
import Species from "../models/species";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// Récupère tous les événements d'un enclos
const getEventsByEnclosure = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Enclosure.findById(req.params.id)
        .then((enclosure) => {
            if (enclosure) {
                Event.find({ enclos: enclosure.nom })
                    .then((events) => res.status(200).json(events))
                    .catch((error) => res.status(404).json({ error }));
            } else {
                res.status(404).json({ message: "Aucun enclos trouvé" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

// Récupère tous les événements d'une espèce
const getEventsBySpecies = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Species.findById(req.params.id)
        .then((species) => {
            if (species) {
                Event.find({ espece: species.nom })
                    .then((events) => res.status(200).json(events))
                    .catch((error) => res.status(404).json({ error }));
            } else {
                res.status(404).json({ message: "Aucune espèce trouvé" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

export default { getEventsByEnclosure, getEventsBySpecies };

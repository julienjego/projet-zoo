import Action from "../models/action";
import Zone from "../models/zone";
import Enclosure from "../models/enclosure";
import { NextFunction, Request, Response } from "express";

// Création d'une action
const createAction = (req: Request, res: Response, next: NextFunction) => {
    const actionObject: typeof Action = req.body;
    const action = new Action({
        date: new Date(req.body.date),
        ...actionObject,
    });
    action
        .save()
        .then(() => {
            console.log(action);
            res.status(201).json({ message: "Action enregistrée !" });
        })
        .catch((error) => {
            res.status(400).json({ error });
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

export default { createAction, getActionsByZone };

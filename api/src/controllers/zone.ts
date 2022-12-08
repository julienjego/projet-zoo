import Enclosure from "../models/enclosure";
import { Request, Response, NextFunction } from "express";
import Zone from "../models/zone";

// Liste les zones
const getZones = (req: Request, res: Response, next: NextFunction) => {
    Zone.find()
        .then((zones) => {
            if (zones) {
                res.status(200).json(zones);
            } else {
                res.status(404).json({ message: "Enclos non trouvé" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

// Retourne les infos d'une zone
const getAZone = (req: Request, res: Response, next: NextFunction) => {
    Zone.findById({ _id: req.params.id })
        .then((zone) => res.status(200).json(zone))
        .catch((error) => res.status(404).json({ error }));
};

const getEnclosuresByZone = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Zone.findById({ _id: req.params.id })
        .then((zone) => {
            if (zone) {
                Enclosure.find({ zone: zone.nom })
                    .then((enclosures) => res.status(200).json(enclosures))
                    .catch((error) => res.status(404).json({ error }));
            } else {
                res.status(404).json({ message: "Enclos introuvables" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

export default { getZones, getAZone, getEnclosuresByZone };

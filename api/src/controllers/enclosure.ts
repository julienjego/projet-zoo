import { Request, Response, NextFunction } from "express";
import Enclosure from "../models/enclosure";
import logger from "../utils/log";

const verifyEnclosure = (req: Request, res: Response, next: NextFunction) => {
    Enclosure.findById({ _id: req.params.id })
        .then((enclos) => {
            if (enclos) {
                res.status(200).json({ message: `${enclos.nom} vérifié` });
                logger.logEvent(
                    enclos.nom,
                    "",
                    "",
                    "verification",
                    req.body.observations
                );
            } else {
                res.status(404).json({ message: "Enclos non trouvé" });
            }
        })
        .catch(() => {
            res.status(400).json({ erreur: "Syntaxe de la requête erronée" });
        });
};

export default { verifyEnclosure };
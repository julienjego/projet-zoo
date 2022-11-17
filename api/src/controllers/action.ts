import Action from "../models/action";
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

export default { createAction };

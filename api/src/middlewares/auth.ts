import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (token) {
        jwt.verify(token, config.token.secret as string, (error, decoded) => {
            if (error) {
                res.status(401).json(error);
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "Non autorisé" });
    }
};

const verifyRole = (role: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let emp = res.locals.jwt;

        if (role.includes(emp.role)) {
            next();
        } else {
            res.status(401).json({ message: "Non autorisé !" });
        }
    };
};

export default { verifyToken, verifyRole };

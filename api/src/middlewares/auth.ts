import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import Employee from "../models/employee";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (token) {
        jwt.verify(token, config.token.secret, (error, decoded) => {
            if (error) {
                res.status(404).json(error);
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "Non autorisé" });
    }
};

const verifyRole = (role: string[]): void => {
    (req: Request, res: Response, next: NextFunction) => {
        Employee.findById({ username: res.locals.username }).then(
            (employee) => {
                if (employee) {
                    if (role.includes(employee.role)) {
                        next();
                    } else {
                        res.status(401).json({ message: "Non autorisé" });
                    }

                    next();
                } else {
                    res.status(401).json({ message: "Non autorisé" });
                }
            }
        );
    };
};

export default { verifyToken, verifyRole };

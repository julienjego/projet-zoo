import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import signToken from "../utils/signToken";
import Employee from "../models/employee";
import removeAccents from "../utils/removeAccents";

const register = (req: Request, res: Response, next: NextFunction) => {
    let { password, nom, prenom, secu, naissance, role } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res
                .status(500)
                .json({ message: hashError.message, error: hashError });
        }
        const _employee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            nom,
            prenom,
            secu,
            naissance,
            role,
            username: removeAccents(prenom) + removeAccents(nom),
            password: hash,
        });

        return _employee
            .save()
            .then((employee) => {
                return res.status(201).json({ employee });
            })
            .catch((error) => {
                return res.status(500).json({ message: error });
            });
    });
};
const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    Employee.find({ username })
        .exec()
        .then((employees) => {
            if (employees.length !== 1) {
                return res.status(401).json({ message: "Non autorisé" });
            }

            bcryptjs.compare(
                password,
                employees[0].password,
                (error, result) => {
                    if (error) {
                        return res
                            .status(401)
                            .json({ message: "Non autorisé" });
                    } else if (result) {
                        signToken(employees[0], (_error, token) => {
                            if (_error) {
                                return res.status(401).json({
                                    message: "Non autorisé",
                                    erreur: error,
                                });
                            } else if (token) {
                                return res.status(200).json({
                                    message: "Authentification réussie !",
                                    token,
                                    employee: employees[0],
                                });
                            }
                        });
                    }
                }
            );
        })
        .catch((error) => {
            return res.status(500).json({ message: error });
        });
};

export default { register, login };

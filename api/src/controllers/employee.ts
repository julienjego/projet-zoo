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
            res.status(500).json({
                message: hashError.message,
                error: hashError,
            });
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

        Employee.findOne({ username: _employee.username }).then((exists) => {
            if (exists) {
                res.status(409).send(
                    "Vous êtes déjà inscrit·e, connectez-vous."
                );
            } else {
                _employee
                    .save()
                    .then((employee) => {
                        res.status(201).json({ employee });
                    })
                    .catch((error) => {
                        res.status(500).json({ message: error });
                    });
            }
        });
    });
};
const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    Employee.find({ username })
        .exec()
        .then((employees) => {
            if (employees.length !== 1) {
                res.status(401).json({
                    message: "Mauvais nom d'utilisateur ou mot de passe",
                });
                return;
            }

            bcryptjs.compare(
                password,
                employees[0].password,
                (error, result) => {
                    if (error || !result) {
                        return res.status(401).json({
                            message:
                                "Mauvais nom d'utilisateur ou mot de passe",
                        });
                    } else if (result) {
                        signToken(employees[0], (_error, token) => {
                            if (_error) {
                                res.status(401).json({
                                    message: "Non autorisé !",
                                    erreur: _error,
                                });
                            } else if (token) {
                                res.status(200).json({
                                    message: "Authentification réussie !",
                                    token,
                                    employee: {
                                        nom: employees[0].nom,
                                        prenom: employees[0].prenom,
                                        role: employees[0].role,
                                    },
                                    expiresIn: 3600,
                                });
                            }
                        });
                    }
                }
            );
        })
        .catch((error) => {
            res.status(500).json({ message: error });
        });
};

// Récupérer un employé par son Id
const getAnEmployee = (req: Request, res: Response, next: NextFunction) => {
    Employee.findById({ _id: req.params.id })
        .then((employee) => res.status(200).json(employee))
        .catch((error) => res.status(404).json({ error }));
};

// Récupérer tous les employés
const getAllEmployees = (req: Request, res: Response, next: NextFunction) => {
    Employee.find()
        .then((employees) => res.status(200).json(employees))
        .catch((error) => res.status(404).json({ error }));
};

export default { register, login, getAnEmployee, getAllEmployees };

import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";

const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res
                .status(500)
                .json({ message: hashError.message, error: hashError });
        }

        // Insert employee into db here
    });
};
const login = (req: Request, res: Response, next: NextFunction) => {};

export default { register, login };

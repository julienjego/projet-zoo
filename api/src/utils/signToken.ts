import jwt from "jsonwebtoken";
import config from "../config/config";
import { IEmployee } from "../interfaces/employee.interface";

const signToken = (
    employee: IEmployee,
    callback: (error: Error | null, token: string | null) => void
): void => {
    try {
        jwt.sign(
            { username: employee.username, role: employee.role },
            config.token.secret as string,
            {
                issuer: config.token.issuer,
                algorithm: "HS256",
                expiresIn: 10,
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error: any) {
        callback(error, null);
    }
};

export default signToken;

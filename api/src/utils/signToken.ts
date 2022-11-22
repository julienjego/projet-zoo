import jwt from "jsonwebtoken";
import config from "../config/config";
import { IEmployee } from "../interfaces/employee.interface";

const signToken = (
    employee: IEmployee,
    callback: (error: Error | null, token: string | null) => void
): void => {
    let timeSinceNow = new Date().getTime();
    let expTime = timeSinceNow + Number(config.token.expireTime) * 100000;
    let expTimeInSecs = Math.floor(expTime / 1000);

    try {
        jwt.sign(
            { username: employee.username, role: employee.role },
            config.token.secret,
            {
                issuer: config.token.issuer,
                algorithm: "HS256",
                expiresIn: expTimeInSecs,
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

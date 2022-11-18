import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    dbUrl: process.env.MONGODB_URL,
    token: {
        expireTime: process.env.SERVER_TOKEN_EXPIRETIME || 3600,
        issuer: process.env.SERVER_TOKEN_ISSUER || "coolIssuer",
        secret: process.env.SERVER_TOKEN_SECRET || "secretsecret",
    },
};

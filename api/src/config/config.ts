import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    dbUrl: process.env.MONGODB_URL,
    token: {
        expireTime: process.env.SERVER_TOKEN_EXPIRETIME,
        issuer: process.env.SERVER_TOKEN_ISSUER,
        secret: process.env.SERVER_TOKEN_SECRET,
    },
};

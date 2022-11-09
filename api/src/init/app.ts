import express, { Express } from "express";
const app: Express = express();
import config from "./config";

app.listen(config.port, () => {
    console.log(`Serveur démarré sur le port ${config.port}`);
});

export default app;

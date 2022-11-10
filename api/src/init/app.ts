import express, { Express } from "express";
const app: Express = express();
import config from "./config";

app.listen(config.port, () => {
    console.log(`Serveur démarré sur le port ${config.port}`);
});

//Middleware pour extraire le corps json d'une requête POST
app.use(express.json());

export default app;

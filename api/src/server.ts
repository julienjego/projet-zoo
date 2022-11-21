import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import config from "./config/config";
import animalRoutes from "./routes/animal";
import speciesRoutes from "./routes/species";
import eventRoutes from "./routes/event";
import enclosureRoutes from "./routes/enclosure";
import actionRoutes from "./routes/action";
import employeeRoutes from "./routes/employee";

const api: Express = express();

//Connexion à la base MongoDB
mongoose
    .connect(config.dbUrl!)
    .then(() => {
        console.log("Connexion à MongoDB réussie !");
        startServer();
    })
    .catch(() => console.log("Connexion à MongoDB échouée !"));

// On se connecte au serveur uniquement si on peut se connecter à la base
const startServer = () => {
    api.use((req: Request, res: Response, next: NextFunction) => {
        // Log de la requête
        console.log(
            `Requête: METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
        );

        res.on("finish", () => {
            // Log de la réponse
            console.log(
                `Réponse: METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
            );
        });

        next();
    });

    api.use(express.urlencoded({ extended: true }));
    api.use(express.json());

    // On envoie les headers pour éviter les erreurs CORS
    api.use((req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );

        if (req.method == "OPTIONS") {
            res.header(
                "Access-Control-Allow-Methods",
                "PUT, POST, PATCH, DELETE, GET"
            );
            return res.status(200).json({});
        }

        next();
    });

    // Routes
    api.use("/api/animals", animalRoutes);
    api.use("/api/species", speciesRoutes);
    api.use("/api/events", eventRoutes);
    api.use("/api/enclosures", enclosureRoutes);
    api.use("/api/actions", actionRoutes);
    api.use("/api/employees", employeeRoutes);

    // Ping pour voir si tout est en place
    api.get("/ping", (req: Request, res: Response, next: NextFunction) =>
        res.status(200).json({ message: "pong" })
    );

    // Gère les erreurs qui pourraient arriver
    api.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error("Bad request");

        console.log(error);

        res.status(400).json({
            message: error.message,
        });
    });

    api.listen(config.port, () =>
        console.log(`Serveur démarré sur le port ${config.port}`)
    );
};

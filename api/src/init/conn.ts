import mongoose from "mongoose";
import config from "./config";

//Connexion à la base MongoDb
mongoose
    .connect(config.dbUrl!)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

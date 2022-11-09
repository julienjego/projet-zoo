import mongoose from "mongoose";
import { Animal } from "./animal.interface";

const animalSchema = new mongoose.Schema<Animal>({
    nom: { type: String, required: true },
    espece: { type: String, required: true },
    naissance: { type: String, required: false },
    deces: { type: String, required: false },
    sexe: { type: String, required: true },
    observations: { type: String, required: false },
    position: { type: String, required: true },
});

module.exports = mongoose.model<Animal>("Animal", animalSchema);

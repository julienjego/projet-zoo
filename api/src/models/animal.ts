import mongoose, { Schema } from "mongoose";
import { IAnimal } from "./animal.interface";

const animalSchema: Schema = new mongoose.Schema<IAnimal>({
    nom: { type: String, required: true },
    espece: { type: String, required: true },
    naissance: { type: String, required: false },
    deces: { type: String, required: false },
    sexe: { type: String, required: true },
    observations: { type: String, required: false },
    position: { type: String, required: true },
});

export default mongoose.model<IAnimal>("Animal", animalSchema);

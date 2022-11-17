import mongoose, { Schema } from "mongoose";
import { ISpecies } from "../interfaces/species.interface";

const speciesSchema: Schema = new mongoose.Schema<ISpecies>({
    _id: { type: Number, requirred: true },
    nom: { type: String, required: true },
    nomApp: { type: String, required: true },
    sociable: { type: Boolean, required: true },
    observations: { type: String, required: true },
    dangereux: { type: Boolean, required: true },
    enclos: { type: String, required: true },
});

export default mongoose.model<ISpecies>("Species", speciesSchema);

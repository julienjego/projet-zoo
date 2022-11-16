import mongoose, { Schema } from "mongoose";
import { IEnclosure } from "./enclosure.interface";

const enclosureSchema: Schema = new mongoose.Schema<IEnclosure>({
    _id: { type: Number, required: true },
    nom: { type: String, required: true },
    nomApp: { type: String, required: true },
    zone: { type: String, required: true },
    coordonnées: { type: String, required: false },
    superficie: { type: Number, required: true },
});

export default mongoose.model<IEnclosure>("Enclosure", enclosureSchema);

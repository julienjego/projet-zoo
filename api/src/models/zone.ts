import mongoose, { Schema } from "mongoose";
import { IZone } from "./zone.interface";

const zoneSchema: Schema = new mongoose.Schema<IZone>({
    _id: { type: Number, required: true },
    nom: { type: String, required: true },
    nomApp: { type: String, required: true },
});

export default mongoose.model<IZone>("Zone", zoneSchema);

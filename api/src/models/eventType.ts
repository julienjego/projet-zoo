import { IEventType } from "./eventType.interface";
import mongoose, { Schema } from "mongoose";

const eventTypeSchema: Schema = new mongoose.Schema<IEventType>({
    _id: { type: Number, requirred: true },
    nom: { type: String, required: true },
    nomApp: { type: String, required: true },
});

export default mongoose.model<IEventType>("EventType", eventTypeSchema);

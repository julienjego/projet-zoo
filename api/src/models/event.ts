import mongoose, { Schema } from "mongoose";
import { IEvent } from "./event.interface";

const eventSchema: Schema = new mongoose.Schema<IEvent>({
    date: { type: Date, required: true },
    enclos: { type: String, required: false },
    espece: { type: String, required: false },
    animal: { type: [String], required: true },
    type: { type: String, required: true },
    observations: { type: String, required: false, default: "RAS" },
});

export default mongoose.model<IEvent>("Event", eventSchema);

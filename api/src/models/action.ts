import mongoose, { Schema } from "mongoose";
import { IAction } from "../interfaces/action.interface";

const actionSchema: Schema = new mongoose.Schema<IAction>({
    creation: { type: String, required: true },
    enclos: { type: String, required: true },
    espece: { type: String, required: true },
    animal: { type: String, required: true },
    date: { type: Date, required: true },
    observations: { type: String, required: true },
});

export default mongoose.model<IAction>("Action", actionSchema);

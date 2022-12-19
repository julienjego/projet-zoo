import mongoose, { Schema } from "mongoose";
import { IAction } from "../interfaces/action.interface";

const actionSchema: Schema = new mongoose.Schema<IAction>({
    creation: { type: String, required: true },
    enclos: { type: Object, required: true },
    espece: { type: Object, required: true },
    animal: { type: Object, required: true },
    date: { type: Date, required: true },
    observations: { type: String, required: true },
});

export default mongoose.model<IAction>("Action", actionSchema);

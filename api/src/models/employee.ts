import { IEmployee } from "./../interfaces/employee.interface";
import mongoose, { Schema } from "mongoose";

const employeeSchema: Schema = new mongoose.Schema<IEmployee>({
    _id: { type: Number, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    secu: { type: Number, required: true },
    naissance: { type: String, required: true },
    role: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

export default mongoose.model<IEmployee>("Employee", employeeSchema);

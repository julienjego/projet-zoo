import { IEmployee } from "./../interfaces/employee.interface";
import mongoose, { Schema } from "mongoose";

const employeeSchema: Schema = new mongoose.Schema<IEmployee>(
    {
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        secu: { type: String, required: true },
        naissance: { type: String, required: true },
        role: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IEmployee>("Employee", employeeSchema);

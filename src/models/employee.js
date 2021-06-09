import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Employee";

const schema = new Schema({
    employee_name: {
        type: String,
        required: true,
        unique: true,
    },
    employee_email: {
        type: String,
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
});

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema, "employee");

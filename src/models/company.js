import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Company";

const schema = new Schema({
    company_name: {
        type: String,
        required: true,
        unique: true,
    },
    company_email: {
        type: String,
    },
    // employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
});

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema, "company");

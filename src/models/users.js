import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Users";

const schema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    company: {
        type: Array,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
    },
});

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema, "users");

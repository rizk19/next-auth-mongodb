import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Users";

const schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema, "users");

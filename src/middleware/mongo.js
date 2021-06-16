import mongoose from "mongoose";
import "../models/users";
import "../models/company";
import "../models/employee";

export async function dbConnect() {
    if (mongoose.connection.readyState >= 1) return;

    return mongoose.connect(process.env.ENV_MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    });
}

export function jsonify(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export default async function dbMiddleware(req, res, next) {
    try {
        if (!global.mongoose) {
            global.mongoose == dbConnect();
        }
    } catch (e) {
        console.error(e);
    }

    return next();
}

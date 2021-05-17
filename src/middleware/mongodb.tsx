import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(process.env.ENV_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function database(req, res, next) {
    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db(process.env.ENV_MONGO_DB_NAME);
    return next();
}

const mongodbMiddleware = nextConnect();

mongodbMiddleware.use(database);

export default mongodbMiddleware;

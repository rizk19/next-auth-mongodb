import createHandler from "@src/middleware";
import Users from "@src/models/users";

const handler = createHandler();

handler.get(async (req, res) => {
    const users = await Users.find({}).exec();
    res.status(200).json(users);
});

export default handler;

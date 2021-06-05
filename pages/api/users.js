import createHandler from "@src/middleware";
import Users from "@src/models/users";

const handler = createHandler();

handler.get(async (req, res) => {
    let body = req.body;
    let params = req.params;
    console.log("bodypack", body);
    console.log("paramsixpack", params);
    const users = await Users.find({}).exec();
    res.status(200).json(users);
});

export default handler;

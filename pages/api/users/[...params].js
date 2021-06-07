import createHandler from "@src/middleware";
import Users from "@src/models/users";

const handler = createHandler();

handler.get(async (req, res) => {
    const { params, coba } = req.query;
    console.log("cobacoba", coba);
    console.log("params", params);
    let body = req.body;
    let paramsP = req.params;
    console.log("bodypack", body);
    console.log("paramsixpack", paramsP);
    const users = await Users.findOne({ _id: params[0] }).exec();
    res.status(200).json(users);
});

export default handler;

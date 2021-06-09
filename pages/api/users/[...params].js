import createHandler from "@src/middleware";
import Users from "@src/models/users";

const handler = createHandler();

handler.get(async (req, res) => {
    const { params } = req.query;
    const users = await Users.findOne(
        { _id: params[0] },
        "_id email name company image",
    )
        .populate("company")
        .exec();
    console.log(users.populated("company"));
    res.status(200).json(users);
});

export default handler;

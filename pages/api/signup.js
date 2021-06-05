import createHandler from "@src/middleware";
import Users from "@src/models/users";

const handler = createHandler();

handler.post(async (req, res) => {
    let data = req.body;
    const user = await Users.findOne({
        email: data.email,
    }).exec();
    if (!user) {
        const dataUser = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
            image: "",
            company: [],
        };
        Users.create(dataUser, function (err, small) {
            if (err) {
                res.status(400).json({
                    status: "error",
                    message: "Failed to create account",
                });
            }
            // saved!
        });
        res.status(200).json({ status: true });
    } else {
        res.status(400).json({
            status: "error",
            message: "Email has been used",
        });
    }
});

export default handler;

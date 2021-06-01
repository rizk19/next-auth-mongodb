import createHandler from "@src/middleware";
import Users from "@src/models/users";
import bcrypt from "bcryptjs";

const handler = createHandler();

handler.get(async (req, res) => {
    const users = await Users.find({}).exec();
    res.status(200).json(users);
});

handler.post(async (req, res) => {
    let data = req.body;
    const user = await Users.findOne({
        email: data.email,
    }).exec();
    let verify = true;
    if (user) {
        const hasPassword = Object.prototype.hasOwnProperty.call(
            user,
            "password",
        );
        if (hasPassword && user.data.password) {
            const resultHash = bcrypt.compareSync(
                data.password,
                user.data.password,
            ); // true
            if (!resultHash) {
                verify = false;
            }
        } else {
            verify = false;
        }
    }
    if (user && verify) {
        console.log("111");
        res.status(200).json(user);
    } else if (!verify) {
        console.log("222");
        res.status(406).json({
            status: "warning",
            message: "Wrong email or password",
        });
    } else {
        console.log("from handler third", user);
        res.status(400).json({
            status: "error",
            message: "Email not found, Please Register",
        });
    }
});

export default handler;

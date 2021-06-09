import createHandler from "@src/middleware";
import Company from "@src/models/company";

const handler = createHandler();

handler.get(async (req, res) => {
    const queryCompany = await Company.find({}).exec();
    res.status(200).json(queryCompany);
});

handler.post(async (req, res) => {
    let data = req.body;
});

export default handler;

import createHandler from "@src/middleware";
import Company from "@src/models/company";
import Employee from "@src/models/employee";
import Users from "@src/models/users";

const handler = createHandler();

handler.post(async (req, res) => {
    const { params } = req.query;
    const data = req.body;
    console.log("paramsparams", params);
    console.log("datadata", data);
    if (params[0] === "check") {
        const queryCompany = await Company.findOne({
            company_name: data.company_name,
        }).exec();
        if (queryCompany) {
            res.status(406).json({
                status: "warning",
                message: "This company has been create",
                error: true,
            });
        } else {
            const dataCompany = {
                company_name: data.company_name,
                company_email: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            Company.create(dataCompany, async function (err, small) {
                if (err) {
                    res.status(400).json({
                        status: "error",
                        message: "Failed to create account",
                    });
                }
                if (small) {
                    console.log("small", small);
                    const filterUser = { _id: data.user_id };
                    const updateUser = {
                        company: [small._id],
                        updatedAt: new Date(),
                    };
                    const User = await Users.findOneAndUpdate(
                        filterUser,
                        updateUser,
                        { new: true },
                    );
                    console.log("User", User);
                    const dataEmployee = {
                        employee_name: User.name,
                        employee_email: User.email,
                        company: small._id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };
                    const queryEmployee = await Employee.create(dataEmployee);
                    console.log("queryEmployee", queryEmployee);
                    if (User && queryEmployee && small) {
                        res.status(200).json(small);
                    } else {
                        res.status(400).json({
                            status: "error",
                            message: "Something went wrong",
                            error: {
                                user: User,
                                employee: queryEmployee,
                                company: small,
                            },
                        });
                    }
                }
                // saved!
            });
        }
    } else {
        res.status(406).json({
            status: "error",
            message: "Method not allowed",
        });
    }
});

export default handler;

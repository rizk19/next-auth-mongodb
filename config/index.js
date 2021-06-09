const baseurl = process.env.NEXTAUTH_URL || "http://localhost:3000";
const baseapi = process.env.NEXTAUTH_URL || "http://localhost:3000/api";

export default {
    users_api: `${baseapi}/users`,

    signin_api: `${baseapi}/signin`,
    signin_route: `${baseurl}/signin`,

    signup_api: `${baseapi}/signup`,
    signup_route: `${baseurl}/signup`,

    company_api: `${baseapi}/company/`,
};

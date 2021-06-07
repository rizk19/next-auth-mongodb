const baseurl = process.env.NEXTAUTH_URL || "http://localhost:3000";
const baseapi = process.env.NEXTAUTH_URL || "http://localhost:3000/api";

export default {
    users_api: `${baseapi}/users`,

    signin_route: `${baseurl}/signin`,
    signin_api: `${baseapi}/signin`,

    signup_route: `${baseurl}/signup`,
    signup_api: `${baseapi}/signup`,
};

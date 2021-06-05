import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profileUrl:
                "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
            async profile(profile) {
                const getId = await axios.get(
                    URL.users_api + `?id=${profile.id}`,
                );
                console.log("guug;e getId", getId);
                console.log("guug;e", profile);
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
            },
        }),
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            // name: "customemail",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            async authorize(credentials, req) {
                try {
                    console.log("cred", credentials.email);
                    const user = await axios.post(
                        `${process.env.NEXTAUTH_URL}/api/signin`,
                        {
                            password: credentials.password,
                            email: credentials.email,
                        },
                    );
                    // console.log("userr", user);
                    // const user = {
                    //     name: credentials.email,
                    //     email: credentials.email,
                    //     password: credentials.password,
                    //     csrfToken: credentials.csrfToken,
                    // };
                    // You need to provide your own logic here that takes the credentials
                    // submitted and returns either a object representing a user or value
                    // that is false/null if the credentials are invalid.
                    // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                    // You can also use the request object to obtain additional parameters
                    // (i.e., the request IP address)

                    if (user && user.data && user.data.email) {
                        console.log("masuk");
                        // Any user object returned here will be saved in the JSON Web Token
                        return user.data;
                    } else {
                        return null;
                    }
                } catch (e) {
                    const errorMessage = e.response.data.message;
                    // Redirecting to the login page with error messsage in the URL
                    throw new Error(
                        errorMessage + "&email=" + credentials.email,
                    );
                }
            },
        }),
    ],
    // https://next-auth.js.org/configuration/databases
    //
    // Notes:
    // * You must install an appropriate node_module for your database
    database: process.env.ENV_MONGO_DB,

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    // secret: process.env.SECRET,

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        signingKey: JSON.parse(process.env.JWT_SIGNING_KEY),
        jwt: true,
        updateAge: 24 * 60 * 60, // 24 hours
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
        // Set to true to use encryption (default: false)
        encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        signIn: "/signin", // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        async signIn(user, account, profile, token) {
            console.log(user, account, profile, token);
            if (user) {
                user.provider = account.provider;
            }
            return true;
        },
        // async redirect(url, baseUrl) { return baseUrl },
        async jwt(token, user) {
            console.log("jwt", token);
            if (user) {
                if (user.company) {
                    token["company"] = user["company"];
                }
                if (user._id) {
                    token["_id"] = user["_id"];
                }
            }
            console.log("jwt user", user);
            return token;
        },
        async session(session, token) {
            if (token) {
                if (token.sub) {
                    session.user["_id"] = token.sub;
                }
                if (token._id) {
                    session.user["_id"] = token._id;
                }
                if (token.company) {
                    session.user["company"] = token.company;
                }
            }
            console.log("session", session);
            console.log("session token", token);
            // Add property to session, like an access_token from a provider.
            // session.accessToken = token.accessToken
            return session;
        },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: false,
});

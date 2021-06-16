import React from "react";
import Head from "next/head";
import { getSession, GetSessionOptions } from "next-auth/client";
import { Main, Cards, Layout } from "@components";

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"
                ></link>
            </Head>
            <Layout>
                <Main />
                <Cards />
            </Layout>
        </>
    );
};

export default Home;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getServerSideProps(ctx: GetSessionOptions) {
    const session = await getSession(ctx);
    return { props: { session } };
}

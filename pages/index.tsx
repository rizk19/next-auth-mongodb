import React from "react";
import { getSession, GetSessionOptions } from "next-auth/client";

import { Header, Main, Footer, Cards } from "@components";

const Home: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Main />
            <Cards />
            <Footer />
        </div>
    );
};

export default Home;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getServerSideProps(ctx: GetSessionOptions) {
    const session = await getSession(ctx);
    return { props: { session } };
}

import React from "react";
import { useSession } from "next-auth/client";
import { Layout } from "@components";
import { Container, Row } from "react-bootstrap";

const Signin: React.FC = () => {
    const [session] = useSession();
    console.log("signin session", session);

    return (
        <Layout>
            <Container className="my-3 flex-grow-1">
                <Row className="min-vh-70 my-2 py-3 centering">
                    <span>Waw</span>
                </Row>
            </Container>
        </Layout>
    );
};

export default Signin;

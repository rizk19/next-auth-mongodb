import React from "react";
import Container from "react-bootstrap/Container";
import { Header, Footer } from "../index";

export const Layout: React.FC = ({ children }) => {
    return (
        <Container fluid className="px-0 d-flex flex-column min-vh-100">
            <Header />
            {children}
            <Footer />
        </Container>
    );
};

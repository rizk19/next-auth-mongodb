import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

export const Header: React.FC = () => {
    const [session] = useSession();
    const router = useRouter();
    const usersession = session && session.user ? session.user.name : "";

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <span style={{ color: "lightgrey" }}>eki</span>
                    <strong>help</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">
                            <Link href="/">
                                <span>Home</span>
                            </Link>
                        </Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        {!session &&
                            router &&
                            router.pathname &&
                            router.pathname !== "/signin" && (
                                <Nav.Link eventKey={2} href="/signin">
                                    <Link href="/signin">
                                        <span>Sign In</span>
                                    </Link>
                                </Nav.Link>
                            )}
                        {session && (
                            <NavDropdown
                                title={usersession}
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => signOut()}>
                                    Sign Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

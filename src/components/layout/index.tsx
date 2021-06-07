import React, { useEffect } from "react";
import { useSession } from "next-auth/client";
import Container from "react-bootstrap/Container";
import { Header, Footer } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@redux/reducers";
import { getUsersRedux } from "@redux/slices/userManagement";

export const Layout: React.FC = ({ children }) => {
    const [session] = useSession();
    const dispatch = useDispatch();

    let count2 = 0;
    if (session) {
        count2 = useSelector((state: RootState) => state.userManagement.count);
    }
    console.log("use", session);
    useEffect(() => {
        if (session) {
            console.log("jalan se dispatch");

            dispatch(getUsersRedux(session.user));
        }
    }, [session]);

    return (
        <Container fluid className="px-0 d-flex flex-column min-vh-100">
            <Header />
            {session && count2}
            {children}
            <Footer />
        </Container>
    );
};

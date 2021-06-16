import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/client";
import { Container } from "react-bootstrap";
import { Header, Footer } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { getUserRedux, selectUser } from "@redux/slices/userManagement";
import axios from "axios";
import { Toast, CreateCompanyModal, HeaderMain, Sidebar } from "@components";
// import { useMutation } from "react-query";
import URL from "@config";

export const Layout = ({ children }) => {
    const [session] = useSession();
    const [hasCompany, setHasCompany] = useState(false);
    const [inputCompany, setInputCompany] = useState("");
    const [loadHitCompany, setLoadHitCompany] = useState(false);
    // eslint-disable-next-line prettier/prettier
    const inputCompanyNameRef = useRef();

    const dispatch = useDispatch();
    const userVuex = useSelector(selectUser);
    const userVuexValid =
        userVuex.constructor === Object && Object.keys(userVuex).length !== 0
            ? true
            : false;

    const onCreateCompany = async () => {
        if (!inputCompanyNameRef?.current?.value) {
            setInputCompany("Nama Perusahaan tidak boleh kosong");
        } else if (
            inputCompanyNameRef?.current?.value &&
            inputCompanyNameRef.current?.value.length <= 3
        ) {
            setInputCompany("Nama Perusahaan harus lebih dari 3 huruf");
        } else {
            setLoadHitCompany(true);
        }
    };

    useEffect(async () => {
        setTimeout(async () => {
            if (loadHitCompany) {
                setInputCompany("");
                const dataPost = {
                    company_name: inputCompanyNameRef.current?.value,
                    user_id: session?.user?._id,
                };
                await axios
                    .post(URL.company_api + "check", dataPost)
                    .then((res) => {
                        if (res) {
                            Toast.fire({
                                icon: "success",
                                title: `Berhasil membuat perusahaan`,
                            });
                            inputCompanyNameRef.current.value = "";
                            setHasCompany(false);
                        }
                    })
                    .catch((err) => {
                        if (err.response && err.response.data) {
                            Toast.fire({
                                icon: `${err.response.data.status}`,
                                title: `${err.response.data.message}`,
                            });
                            console.log(err.response.data.error);
                        } else {
                            Toast.fire({
                                icon: `error`,
                                title: `Something wrong, please try again`,
                            });
                        }
                    })
                    .finally(() => setLoadHitCompany(false));
            }
        }, 300);
    }, [loadHitCompany]);

    useEffect(() => {
        if (
            session &&
            userVuex.constructor === Object &&
            Object.keys(userVuex).length === 0
        ) {
            console.log("jalan se dispatch", userVuex);

            dispatch(getUserRedux(session.user));
        }

        if (
            session?.user?.company &&
            session.user.company.length === 0 &&
            Object.keys(userVuex).length !== 0 &&
            userVuex?.company?.length === 0
        ) {
            console.log(inputCompanyNameRef.current?.value);

            setHasCompany(true);
        } else if (
            session?.user &&
            !session.user.company &&
            Object.keys(userVuex).length !== 0 &&
            userVuex?.company?.length === 0
        ) {
            session.user.company = userVuex.company;
            if (userVuex.company.length === 0) {
                setHasCompany(true);
            }
        } else if (
            session?.user &&
            session.user.company.length === 0 &&
            Object.keys(userVuex).length !== 0 &&
            userVuex?.company?.length === 0
        ) {
            setHasCompany(true);
        }
        console.log("userVuex.length", Object.keys(userVuex).length);
        console.log(userVuex);
    }, [session, userVuex]);

    return (
        <Container fluid className="px-0 d-flex flex-column min-vh-100">
            {userVuexValid && (
                <>
                    <Header />
                    {children}
                    <Footer />
                </>
            )}
            {!userVuexValid && (
                <>
                    <HeaderMain />
                    <Sidebar />
                    <div className="layout_children_content">{children}</div>
                </>
            )}
            <CreateCompanyModal
                // onChangeCompany={onChangeCompany}
                errors={inputCompany}
                onClick={onCreateCompany}
                propsref={inputCompanyNameRef}
                show={hasCompany}
                onHide={() => setHasCompany(false)}
            />
        </Container>
    );
};

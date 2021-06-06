import React, { useState } from "react";
import { signIn } from "next-auth/client";
import Link from "next/link";
import { Layout, Toast } from "@components";
import { Container, Row, Card, Button, Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import Image from "next/image";
import axios from "axios";
import URL from "@config";

const Signin = () => {
    const [typePass, setTypePass] = useState(false);
    const handlePassword = () => {
        setTypePass(!typePass);
    };
    const passSubmit = async (params) => {
        const data = { ...params, callbackUrl: `${window.location.origin}` };
        // signIn("credentials", params);
        await axios
            .post(URL.signin_api, {
                password: params.password,
                email: params.email,
            })
            .then((res) => {
                Toast.fire({
                    icon: "success",
                    title: `Signin Success`,
                });
                if (res.data) {
                    setTimeout(() => {
                        signIn("credentials", data);
                    }, 300);
                }
                console.log("res", res);
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    Toast.fire({
                        icon: `${err.response.data.status}`,
                        title: `${err.response.data.message}`,
                    });
                } else {
                    Toast.fire({
                        icon: `error`,
                        title: `Something wrong, please try again`,
                    });
                }
            });
        // console.log("data", data);
    };

    return (
        <Layout>
            <Container className="my-3 flex-grow-1">
                <Row className="min-vh-70 my-2 py-3 centering">
                    <Card>
                        {/* <Card.Header>Featured</Card.Header> */}
                        <Card.Body
                            style={{ width: "30em" }}
                            className="text-center"
                        >
                            <Card.Title>Sign in</Card.Title>
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                validate={(values) => {
                                    const errors = { email: "", password: "" };
                                    const touched = {
                                        email: false,
                                        password: false,
                                    };
                                    if (values.email.length > 0) {
                                        touched.email = true;
                                    }
                                    if (values.password.length > 0) {
                                        touched.password = true;
                                    }
                                    if (!values.password && touched.password) {
                                        errors.password = "Required";
                                    } else if (
                                        values.password.length < 6 &&
                                        touched.password
                                    ) {
                                        errors.password =
                                            "Password must more than 6(six) word";
                                    }
                                    if (!values.email && touched.email) {
                                        errors.email = "Required";
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            values.email,
                                        ) &&
                                        touched.email
                                    ) {
                                        errors.email = "Invalid email address";
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    console.log("values", values);

                                    // setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                    // }, 400);
                                }}
                            >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    values,
                                    errors,
                                    isSubmitting,
                                }) => {
                                    return (
                                        <Form
                                            noValidate
                                            onSubmit={handleSubmit}
                                        >
                                            <Row className="mt-2">
                                                <Form.Group
                                                    as={Col}
                                                    md="12"
                                                    controlId="email"
                                                >
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={values.email}
                                                        placeholder="Email"
                                                        onChange={handleChange}
                                                        isValid={
                                                            !errors.email &&
                                                            values.email
                                                                ? true
                                                                : false
                                                        }
                                                        isInvalid={
                                                            !!errors.email
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.email}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-2">
                                                <Form.Group
                                                    as={Col}
                                                    md="12"
                                                    controlId="password"
                                                >
                                                    <Form.Control
                                                        type={
                                                            typePass
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        name="password"
                                                        value={values.password}
                                                        placeholder="Password"
                                                        onChange={handleChange}
                                                        isValid={
                                                            !errors.password &&
                                                            values.password
                                                                ? true
                                                                : false
                                                        }
                                                        isInvalid={
                                                            !!errors.password
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.password}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} md="12">
                                                    <div
                                                        style={{
                                                            textAlign: "start",
                                                        }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id="showpasswordcheckbox"
                                                            checked={typePass}
                                                            onChange={() =>
                                                                handlePassword()
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="showpasswordcheckbox"
                                                            style={{
                                                                fontSize:
                                                                    "13px",
                                                            }}
                                                        >
                                                            Show Password
                                                        </label>
                                                    </div>
                                                </Form.Group>
                                            </Row>
                                            <Button
                                                type="submit"
                                                className="w-100"
                                                disabled={
                                                    !!errors.email ||
                                                    !!errors.password ||
                                                    values.email === "" ||
                                                    values.password === ""
                                                }
                                                onClick={() =>
                                                    passSubmit(values)
                                                }
                                            >
                                                Sign in with email
                                            </Button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                            <Row
                                style={{
                                    lineHeight: "2rem",
                                    justifyContent: "flex-end",
                                    fontSize: "13px",
                                    paddingRight: "1rem",
                                }}
                            >
                                Don't have an account yet?&nbsp;
                                <Link href="/signup"> Register now </Link>
                            </Row>
                        </Card.Body>
                        {/* <Card.Footer className="text-muted text-right">
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Footer> */}
                    </Card>
                </Row>
                <Row className="min-vh-30 centering">
                    <Card style={{ width: "30.3em", paddingBottom: "0.5em" }}>
                        <Card.Text
                            style={{
                                paddingTop: "1em",
                                marginBottom: "0rem",
                                textAlign: "center",
                            }}
                        >
                            Sign in with
                        </Card.Text>
                        <Card.Body className="text-center">
                            <Button
                                style={{ width: "100%" }}
                                variant="light"
                                onClick={() =>
                                    signIn("google", {
                                        callbackUrl: `${window.location.origin}`,
                                    })
                                }
                            >
                                <Image
                                    src="/icons/google-icon.svg"
                                    alt="github"
                                    width="28"
                                    height="29"
                                />
                                <span
                                    style={{
                                        verticalAlign: "super",
                                        marginLeft: "1rem",
                                    }}
                                >
                                    Google
                                </span>
                            </Button>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </Layout>
    );
};

// Signin.getInitialProps = async () => {
//     const res = await axios
//         .get("http://localhost:3000/api/signin")
//         .then((res) => res)
//         .catch((err) => err);
//     console.log("resres", res.data);
//     return { data: res.data };
// };

export default Signin;

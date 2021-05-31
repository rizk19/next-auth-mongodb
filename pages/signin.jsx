import React, { useState } from "react";
import { useSession, signIn } from "next-auth/client";
import { Layout } from "@components";
import { Container, Row, Card, Button, Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import Image from "next/image";
import axios from "axios";

const Signin = ({ data }) => {
    const [session] = useSession();
    const [typePass, setTypePass] = useState(false);
    const handlePassword = () => {
        setTypePass(!typePass);
    };
    console.log("signin session", session);
    const passSubmit = (params) => {
        const data = { ...params, callbackURL: process.env.NEXTAUTH_URL };
        signIn("credentials", params);
        console.log(data);
    };

    return (
        <Layout>
            <Container className="my-3 flex-grow-1">
                <Row className="min-vh-70 my-2 py-3 centering">
                    <Card>
                        {/* <Card.Header>Featured</Card.Header> */}
                        <Card.Body
                            style={{ width: "550px" }}
                            className="text-center"
                        >
                            <Card.Title>Sign in</Card.Title>
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                initialTouched={{
                                    email: false,
                                    password: false,
                                }}
                                validate={(values) => {
                                    const errors = { email: "", password: "" };
                                    if (!values.password) {
                                        errors.password = "Required";
                                    } else if (values.password.length < 6) {
                                        errors.password =
                                            "Password must more than 6(six) word";
                                    }
                                    if (!values.email) {
                                        errors.email = "Required";
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            values.email,
                                        )
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
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="showpasswordcheckbox"
                                                            checked={typePass}
                                                            onChange={() =>
                                                                handlePassword()
                                                            }
                                                        />
                                                        <label htmlFor="showpasswordcheckbox">
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
                            <Card.Text
                                style={{
                                    borderBottom: "1px solid black",
                                    lineHeight: "3rem",
                                }}
                            >
                                or
                            </Card.Text>
                            <Button
                                className="w-100"
                                variant="light"
                                onClick={() => signIn("google")}
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
                                    Sign in with Google
                                </span>
                            </Button>
                        </Card.Body>
                        {/* <Card.Footer className="text-muted text-right">
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Footer> */}
                    </Card>
                </Row>
            </Container>
        </Layout>
    );
};

Signin.getInitialProps = async () => {
    const res = await axios
        .get("http://localhost:3000/api/signin")
        .then((res) => res)
        .catch((err) => err);
    console.log("resres", res.data);
    return { data: res.data };
};

export default Signin;

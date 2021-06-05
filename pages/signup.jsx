import React from "react";
import { useRouter } from "next/router";
import { Layout, Toast } from "@components";
import { Container, Row, Card, Button, Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import URL from "@config";
import bcrypt from "bcryptjs";

const Signup = () => {
    const router = useRouter();
    const passSubmit = async (params) => {
        const hashPassword = bcrypt.hashSync(params.password, 10);
        const dataPost = {
            name: params.name,
            email: params.email,
            password: hashPassword,
        };
        await axios
            .post(URL.signup_api, dataPost)
            .then((res) => {
                Toast.fire({
                    icon: "success",
                    title: `Signup Success`,
                });
                if (res.data.status) {
                    setTimeout(() => {
                        router.push("/signin");
                    }, 1000);
                }
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
                            <Card.Title>Sign up</Card.Title>
                            <Formik
                                initialValues={{
                                    email: "",
                                    name: "",
                                    password: "",
                                    confirmPassword: "",
                                }}
                                validate={(values) => {
                                    const errors = {
                                        email: "",
                                        password: "",
                                        confirmPassword: "",
                                    };
                                    const touched = {
                                        email: false,
                                        name: false,
                                        password: false,
                                        confirmPassword: false,
                                    };
                                    if (values.email.length > 0) {
                                        touched.email = true;
                                    }
                                    if (values.name.length > 0) {
                                        touched.name = true;
                                    }
                                    if (values.password.length > 0) {
                                        touched.password = true;
                                    }
                                    if (values.confirmPassword.length > 0) {
                                        touched.confirmPassword = true;
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
                                    if (
                                        !values.confirmPassword &&
                                        touched.confirmPassword
                                    ) {
                                        errors.confirmPassword = "Required";
                                    } else if (
                                        values.password !==
                                            values.confirmPassword &&
                                        touched.confirmPassword
                                    ) {
                                        errors.confirmPassword =
                                            "Password not match!";
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
                            >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    values,
                                    errors,
                                }) => {
                                    return (
                                        <Form
                                            noValidate
                                            onSubmit={handleSubmit}
                                        >
                                            <Row className="mt-4">
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
                                            <Row>
                                                <Form.Group
                                                    as={Col}
                                                    md="12"
                                                    controlId="name"
                                                >
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={values.name}
                                                        placeholder="Your Name"
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group
                                                    as={Col}
                                                    md="12"
                                                    controlId="password"
                                                >
                                                    <Form.Control
                                                        type="password"
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
                                            </Row>
                                            <Row className="mb-2">
                                                <Form.Group
                                                    as={Col}
                                                    md="12"
                                                    controlId="confirmPassword"
                                                >
                                                    <Form.Control
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={
                                                            values.confirmPassword
                                                        }
                                                        placeholder="Confirm Password"
                                                        onChange={handleChange}
                                                        isValid={
                                                            !errors.confirmPassword &&
                                                            values.confirmPassword
                                                                ? true
                                                                : false
                                                        }
                                                        isInvalid={
                                                            !!errors.confirmPassword
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.confirmPassword}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Button
                                                type="submit"
                                                className="w-100"
                                                disabled={
                                                    !!errors.email ||
                                                    !!errors.password ||
                                                    values.email === "" ||
                                                    values.password === "" ||
                                                    values.confirmPassword ===
                                                        ""
                                                }
                                                onClick={() =>
                                                    passSubmit(values)
                                                }
                                            >
                                                Sign up
                                            </Button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </Layout>
    );
};

// Signup.getInitialProps = async () => {
//     const res = await axios
//         .get("http://localhost:3000/api/signup")
//         .then((res) => res)
//         .catch((err) => err);
//     console.log("resres", res.data);
//     return { data: res.data };
// };

export default Signup;

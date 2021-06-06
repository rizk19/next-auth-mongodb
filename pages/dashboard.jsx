import React, { useState } from "react";
import { signIn } from "next-auth/client";
import Link from "next/link";
import { Layout, Counter } from "@components";
import { Container, Row, Card, Button, Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import Image from "next/image";
import axios from "axios";
import URL from "@config";

const Dashboard = () => {
    return (
        <Layout>
            <Counter />
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

export default Dashboard;

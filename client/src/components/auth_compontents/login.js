import { Formik, Form } from "formik";

import * as Yup from "yup";
import AuthService from "../../services/auth.service";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../Istruzione.css"

// Creating schema
const schema = Yup.object().shape({
    username: Yup.string()
        .required("Username é un campo obbligatorio"),
    password: Yup.string()
        .required("Password é un campo obbligatorio"),
});

function Login() {

    let navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    return (
        <>
            {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
            <Formik
                validationSchema={schema}
                initialValues={{ username: "", password: "" }}
                onSubmit={ async (values) => {

                    setLoading(true);
                    setMessage("");

                    console.log(values.username, values.password)
                    AuthService.login(values.username, values.password)
                        .then((response) => {
                                // navigate to home page
                                navigate("/home");
                                window.location.reload();
                            },
                            (error) => {
                                const resMessage = (
                                        error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                    error.message ||
                                    error.toString();

                                setLoading(false);
                                setMessage(resMessage);
                            });
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                  }) => (
                    <div className="login">
                        <div className="form">
                            {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                            <Form noValidate onSubmit={handleSubmit}>
                                <span>Login</span>
                                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                                <input
                                    type="username"
                                    name="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    placeholder="Enter username"
                                    className="form-control inp_text"
                                    id="username"
                                />
                                {/* If validation is not passed show errors */}
                                <p className="error">
                                    {errors.username && touched.username && errors.username}
                                </p>
                                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="Enter password"
                                    className="form-control"
                                />
                                {/* If validation is not passed show errors */}
                                <p className="error">
                                    {errors.password && touched.password && errors.password}
                                </p>
                                {/* Click on submit button to submit the form */}

                                <button type="submit" className="login_button">Entra</button>

                                {message && (
                                    <div className="form-login-group">
                                        <div
                                            className={loading ? "alert alert-success" : "alert alert-danger"}
                                            role="alert"
                                        >
                                            {message}
                                        </div>
                                    </div>
                                )}
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
}

export default Login

/*
*   This page has a Form with username & password.
    – We’re gonna verify them as required field.
    – If the verification is ok, we call AuthService.login() method, then direct user to Profile page using useNavigate() hook, or show message with response error.
*
*
*
* */

import React, {useState, useRef} from "react"
import {useNavigate} from "react-router-dom"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

import AuthService from "../../services/auth.service"

const required = (value) => {
    if(!value){
        return (
            <div className="alert alert-danger" role="alert">
                This field is required !
            </div>
        );
    }
};

const Login = () => {
    let navigate = useNavigate()

    const form = useRef()
    const checkBtn = useRef()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            AuthService.login(username, password)
                .then(() => {
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
        } else {
            setLoading(false)
        }
    };
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-login-group">
                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-login-group">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-login-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-login-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );

};

export default Login
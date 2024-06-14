import React, {useState} from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import AuthService from "../../services/auth.service";

const validationSchema = Yup.object().shape({
    username: Yup.string().nonNullable('Invalid username').required('Username is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    roles: Yup.array().min(1,'Inserire almeno un ruolo')
});


const Register = () => {

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");


    return (
        <div>
            <h1>Sign Up</h1>
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    username: '',
                    password: '',
                    confirm_password: '',
                    roles: []
                }}
                onSubmit={async (values) => {

                    AuthService.register(values.username, values.password, values.roles).then(
                        (response) => {
                            setMessage(response.data.message);
                            setSuccessful(true);
                        },
                        (error) => {
                            const resMessage =
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                error.message ||
                                error.toString();

                            setMessage(resMessage);
                            setSuccessful(false);
                        }
                    );
                }}
            >{ ({
                   values,
                   errors,
                   touched,
                   handleChange,
                   handleBlur,
                   handleSubmit,
               }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    {!successful && (
                        <div>
                            <label htmlFor="Username">Username</label>
                            <Field id="username" name="username" placeholder="utente"/>
                            {/* If validation is not passed show errors */}
                            <p className="error">
                                {errors.username && touched.username && errors.username}
                            </p>

                            <label htmlFor="password">Password</label>
                            <Field
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
                            <label htmlFor="password">Confirm Password</label>
                            <Field
                                type="password"
                                name="confirm_password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirm_password}
                                placeholder="Enter password"
                                className="form-control"
                            />
                            {/* If validation is not passed show errors */}
                            <p className="error">
                                {errors.confirm_password && touched.confirm_password && errors.confirm_password}
                            </p>
                            <div id="checkbox-group">Roles</div>
                            <div role="group" aria-labelledby="checkbox-group">
                                <label>
                                    <Field type="checkbox" name="roles" value="User"/>
                                    User
                                </label>
                                <label>
                                    <Field type="checkbox" name="roles" value="Moderator"/>
                                    Moderator
                                </label>
                                <label>
                                    <Field type="checkbox" name="roles" value="Admin"/>
                                    Admin
                                </label>
                            </div>
                            {/* If validation is not passed show errors */}
                            <p className="error">
                                {errors.roles && touched.roles && errors.roles}
                            </p>
                            <button type="submit">Submit</button>
                        </div>
                    )}

                    {message && (
                        <div className="form-login-group">
                            <div
                                className={successful ? "alert alert-success" : "alert alert-danger"}
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Register


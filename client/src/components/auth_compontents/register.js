import React, {useState} from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import AuthService from "../../services/auth.service";
import "../Istruzione.css"

const validationSchema = Yup.object().shape({
    username: Yup.string().nonNullable('username non valido').required('Username é richiesto'),
    password: Yup.string()
        .min(6, 'Password deve essere di almeno 6 caratteri')
        .required('Password é obbligatoria'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords devono essere uguali')
        .required('Conferma Password é obbligatoria'),
    roles: Yup.array().min(1,'Inserire almeno un ruolo')
});


const Register = () => {

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [IsNotUser, setIsNotUser] = useState(false);


    function handleRoleChange(value){
        console.log(value)

        if("Utente" === value){
            setIsNotUser(false)
        }
        else{
            IsNotUser ? setIsNotUser(false) : setIsNotUser(true);

        }

    }
    return (
        <div className="register">
            <h2>Sign Up</h2>
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    username: '',
                    password: '',
                    confirm_password: '',
                    roles: [],
                    role_password: ''
                }}
                onSubmit={async (values) => {

                    AuthService.register(values.username, values.password, values.roles, values.role_password).then(
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

                validateOnChange={async (values) => {
                    console.log(values.roles)
                    console.log(IsNotUser)

                    if("Utente" in values.roles || values.roles.length === 0){
                        setIsNotUser(false)
                    }
                    else{
                        setIsNotUser(true)
                    }
                }}

            >{ ({
                   values,
                   errors,
                   touched,
                   handleChange,
                   handleBlur,
                   handleSubmit

               }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    {!successful && (
                        <div className="form-control">
                            <label htmlFor="Username">Username:</label>
                            <Field id="username" name="username" placeholder="utente" className="form-text"/>
                            {/* If validation is not passed show errors */}
                            <p className="error">
                                {errors.username && touched.username && errors.username}
                            </p>

                            <label htmlFor="password">Password:</label>
                            <Field
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}

                                placeholder="Enter password"
                                className="form-text"
                            />
                            {/* If validation is not passed show errors */}
                            <p className="error">
                                {errors.password && touched.password && errors.password}
                            </p>
                            <label htmlFor="password">Conferma Password:</label>
                            <Field
                                type="password"
                                name="confirm_password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirm_password}
                                placeholder="Enter password"
                                className="form-text"
                            />
                            {/* If validation is not passed show errors */}
                            <p className="error">
                                {errors.confirm_password && touched.confirm_password && errors.confirm_password}
                            </p>
                            <span id="checkbox-group">Ruoli:</span>
                            <div className="checkbox_container" role="group" aria-labelledby="checkbox-group">
                                <label className="label_checkbox">
                                    <Field type="checkbox" name="roles" value="user" id="user" />
                                    Utente
                                </label>
                                <label className="label_checkbox">
                                    <Field type="checkbox" name="roles" value="moderator" onClick={ e => {
                                        // build in formik
                                        handleChange(e)

                                        // custom event
                                        handleRoleChange(e.target.value)}
                                    } />
                                    Moderatore
                                </label>
                                {/*<label className="label_checkbox">
                                    <Field type="checkbox" name="roles" value="admin" onClick={ e => {
                                        // build in formik
                                        handleChange(e)

                                        // custom event
                                        handleRoleChange(e.target.value)}
                                    } />
                                    Amministratore
                                </label>*/}
                            </div>
                            {/* check role password */}
                            {IsNotUser && (
                                <div>
                                    <p style={{ fontSize: '18px' }}>per creare il profilo moderatore è necessario inserire la corretta password:</p>
                                    <Field
                                        type="password"
                                        name="role_password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        placeholder="Enter password"
                                        className="form-text"
                                    />
                                </div>
                            )}
                            {/* If validation is not passed show errors */}
                            <p className="error">
                                {errors.roles && touched.roles && errors.roles}
                            </p>
                            <button className="sign_up_button" type="submit">Submit</button>
                        </div>
                    )}

                    {message && (
                        <div className="error">
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


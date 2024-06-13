import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string().email('Invalid username').required('Username is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});


const Basic = () => (
    <div>
        <h1>Sign Up</h1>
        <Formik
            validationSchema={validationSchema}
            initialValues={{
                username: '',
                password: '',
                confirm_password: '',
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
        >{({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
            <Form>
                <label htmlFor="Username">Username</label>
                <Field id="username" name="username" placeholder="utente"/>


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
                <label htmlFor="password">Confirm Password</label>
                <Field
                    type="confirm_password"
                    name="confirm_password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirm_password}
                    placeholder="Enter password"
                    className="form-control"
                />
                <button type="submit">Submit</button>
            </Form>
        )}
        </Formik>
    </div>
);

export default Basic


import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

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


const Basic = () => (
    <div>
        <h1>Sign Up</h1>
        <Formik
            validationSchema={validationSchema}
            initialValues={{
                username: '',
                password: '',
                confirm_password: '',
                roles:[]
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
            <Form noValidate onSubmit={handleSubmit}>
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
            </Form>
        )}
        </Formik>
    </div>
);

export default Basic


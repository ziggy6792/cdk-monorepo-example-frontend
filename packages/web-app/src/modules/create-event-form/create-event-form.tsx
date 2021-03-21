import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Grid } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import { TextField } from 'formik-material-ui';

// const validationSchema = yup.object({
//     email: yup.string().required('Enter your email').email('Enter a valid email').required('Email is required'),
//     password: yup.string().required('Enter your password').min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
// });

const CreateEventForm = () => (
    <Formik
        initialValues={{ name: '' }}
        validationSchema={Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 400);
        }}
    >
        <Form>
            <Grid container direction='column'>
                <Grid item>
                    <Field name='name' component={TextField} label='Name' />
                </Grid>

                <Grid item>
                    <Button type='submit'>Submit</Button>
                </Grid>
            </Grid>
        </Form>
    </Formik>
);

export default CreateEventForm;

// import React from 'react';
// import { Field, Formik, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Button, Grid } from '@material-ui/core';
// // import TextField from '@material-ui/core/TextField';
// import { TextField } from 'formik-material-ui';
// import { TextArea } from 'src/components/formik-material-ui/formik-material-ui';
// import { DateTimePicker } from 'formik-material-ui-pickers';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// import DateFnsUtils from '@date-io/date-fns';

// // const validationSchema = yup.object({
// //     email: yup.string().required('Enter your email').email('Enter a valid email').required('Email is required'),
// //     password: yup.string().required('Enter your password').min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
// // });

// const CreateEventForm = () => (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//         <Formik
//             initialValues={{ name: '' }}
//             validationSchema={Yup.object({
//                 name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
//             })}
//             onSubmit={(values, { setSubmitting }) => {
//                 setTimeout(() => {
//                     alert(JSON.stringify(values, null, 2));
//                     setSubmitting(false);
//                 }, 400);
//             }}
//         >
//             <Form>
//                 <Grid container direction='column'>
//                     <Grid item>
//                         <Field name='name' component={TextField} label='Name' />
//                     </Grid>
//                     <Grid item>
//                         <Field name='desciption' component={TextArea} placeholder='Description' />
//                     </Grid>
//                     <Grid item>
//                         <Field name='startTime' component={DateTimePicker} label='Start Time' />
//                     </Grid>

//                     <Grid item>
//                         <Button type='submit'>Submit</Button>
//                     </Grid>
//                 </Grid>
//             </Form>
//         </Formik>
//     </MuiPickersUtilsProvider>
// );

// export default CreateEventForm;

import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TimePicker, DatePicker, DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Depending on the library you picked
import DateFnsUtils from '@date-io/date-fns';

const CreateEventForm: React.FC = () => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
            initialValues={{
                date: new Date(),
                time: new Date(),
                dateTime: new Date(),
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                }, 500);
            }}
        >
            {({ submitForm, isSubmitting }) => (
                <Form>
                    <Field component={TimePicker} name='time' label='Time' />
                    <br />
                    {/* <Field component={DatePicker} name='date' label='Date' />
                    <br />
                    <Field component={DateTimePicker} name='dateTime' label='Date Time' />
                    {isSubmitting && <LinearProgress />} */}
                    <br />
                    <Button variant='contained' color='primary' disabled={isSubmitting} onClick={submitForm}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    </MuiPickersUtilsProvider>
);

export default CreateEventForm;

import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { TextArea } from 'src/components/formik-material-ui/formik-material-ui';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { CreateEventInput } from 'src/generated-types';
import { addHours, startOfHour } from 'date-fns';
import SubmitButton from 'src/components/ui/submit-button';

interface ICreateEventFormProps {
    onSubmit: (event: CreateEventInput) => Promise<void>;
}

const CreateEventForm: React.FC<ICreateEventFormProps> = ({ onSubmit }) => {
    const minTime = startOfHour(addHours(new Date(), 1));
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Formik
                initialValues={{ name: '', startTime: minTime, description: null as string }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    startTime: Yup.date().min(minTime, 'Please pick a later date'),
                })}
                onSubmit={async values => {
                    await onSubmit(values);
                }}
            >
                {props => {
                    const { isSubmitting, isValid, dirty } = props;
                    return (
                        <Form>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Field name='name' component={TextField} label='Name' />
                                </Grid>
                                <Grid item>
                                    <Field name='description' component={TextArea} placeholder='Description' />
                                </Grid>
                                <Grid item>
                                    <Field name='startTime' component={DateTimePicker} label='Start Time' minutesStep={15} minDate={minTime} />
                                </Grid>
                                <Grid item>
                                    <SubmitButton isSubmitting={isSubmitting} dirty={dirty} allowSubmitPristine={false} isValid={isValid} />
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </MuiPickersUtilsProvider>
    );
};

export default CreateEventForm;

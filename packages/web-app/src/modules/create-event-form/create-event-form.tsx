import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { TextArea } from 'src/components/formik-material-ui/formik-material-ui';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { CreateEventInput } from 'src/generated-types';
import { addHours, startOfHour } from 'date-fns';
import FormButtons from 'src/components/ui/buttons/form-buttons';

interface ICreateEventFormProps {
    onSubmit: (event: CreateEventInput) => Promise<void>;
    onCancel: () => void;
    title: string;
}

const CreateEventForm: React.FC<ICreateEventFormProps> = ({ onSubmit, onCancel, title }) => {
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
                                <Grid container direction='column' alignItems='center' spacing={0}>
                                    <Grid item>
                                        <Typography variant='h3' gutterBottom>
                                            {title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction='column' alignItems='center' justify='center' spacing={2}>
                                    <Grid item>
                                        <Field name='name' component={TextField} label='Name' autoFocus />
                                    </Grid>
                                    <Grid item>
                                        <Field name='startTime' component={DateTimePicker} label='Start Time' minutesStep={15} minDate={minTime} />
                                    </Grid>
                                    <Grid item>
                                        <Field name='description' component={TextArea} placeholder='Description' />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <FormButtons isSubmitting={isSubmitting} dirty={dirty} isValid={isValid} onCancel={onCancel} />
                        </Form>
                    );
                }}
            </Formik>
        </MuiPickersUtilsProvider>
    );
};

export default CreateEventForm;

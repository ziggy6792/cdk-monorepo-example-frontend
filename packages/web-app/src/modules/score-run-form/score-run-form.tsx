import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { addHours, startOfHour } from 'date-fns';
import FormButtons from 'src/components/ui/buttons/form-buttons';

export interface IIScoreRunFormValues {
    name: string;
}

interface IScoreRunFormProps {
    onSubmit: (formValues: IIScoreRunFormValues) => Promise<void>;
    onCancel: () => void;
    initialValues?: IIScoreRunFormValues;
    title: string;
}

const ScoreRunForm: React.FC<IScoreRunFormProps> = ({ onSubmit, onCancel, title, initialValues }) => {
    const minTime = startOfHour(addHours(new Date(), 1));
    return (
        <Formik
            initialValues={initialValues || { name: '', startTime: minTime, description: '' }}
            validationSchema={Yup.object({})}
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
                            </Grid>
                        </Grid>
                        <FormButtons isSubmitting={isSubmitting} dirty={dirty} isValid={isValid} onCancel={onCancel} />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ScoreRunForm;

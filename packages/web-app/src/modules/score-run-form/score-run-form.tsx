import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import FormButtons from 'src/components/ui/buttons/form-buttons';

export interface IScoreRunFormRunScore {
    score?: number;
}
export interface IScoreRunFormValues {
    runs?: IScoreRunFormRunScore[];
}

interface IScoreRunFormProps {
    onSubmit: (formValues: IScoreRunFormValues) => Promise<void>;
    onCancel: () => void;
    initialValues?: IScoreRunFormValues;
    title: string;
}

const ScoreRunForm: React.FC<IScoreRunFormProps> = ({ onSubmit, onCancel, title, initialValues }) => {
    console.log('initialValues', initialValues);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({})}
            onSubmit={async (values) => {
                await onSubmit(values);
            }}
        >
            {(props) => {
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

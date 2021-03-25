/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Grid, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormButtons from 'src/components/ui/buttons/form-buttons';
import _ from 'lodash';
import AceEditor from 'src/components/forms/ace-editor/ace-editor';

import { CompetitionParamsInput } from 'src/generated-types';

export interface IUserOption {
    id: string;
    fullName: string;
}

export interface IBuildCompetitionFormValues {
    params: string;
}

interface IBuildCompetitionFormProps {
    onSubmit: (formValues: IBuildCompetitionFormValues) => Promise<void>;
    onCancel: () => void;
    initialValues?: IBuildCompetitionFormValues;
    title: string;
}

const BuildCompetitionForm: React.FC<IBuildCompetitionFormProps> = ({ onSubmit, onCancel, title, initialValues }) => (
    // console.log('riderOptions', riderOptions);

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
            initialValues={initialValues}
            onSubmit={async values => {
                await onSubmit(values);
            }}
        >
            {props => {
                const { isSubmitting, isValid, dirty, errors, touched, setFieldValue, values } = props;
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
                                    <Field name='params' component={AceEditor} autoFocus placeholder='Enter competition build params' />
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
export default BuildCompetitionForm;

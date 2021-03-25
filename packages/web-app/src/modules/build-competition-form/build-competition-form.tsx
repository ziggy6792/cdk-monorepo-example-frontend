/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Grid, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormButtons from 'src/components/ui/buttons/form-buttons';
import AceEditor from 'src/components/forms/ace-editor/ace-editor';
import jsYaml from 'js-yaml';

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
    allowSubmitPristine?: boolean;
    title: string;
}

const validate = (values: IBuildCompetitionFormValues) => {
    if (!values.params) {
        return { params: 'Required' };
    }

    try {
        const parsedParams = { rounds: jsYaml.load(values.params) };
    } catch (err) {
        // eslint-disable-next-line no-underscore-dangle
        return { params: err.message };
    }

    return {};
};

const BuildCompetitionForm: React.FC<IBuildCompetitionFormProps> = ({ onSubmit, onCancel, title, initialValues, allowSubmitPristine }) => (
    // console.log('riderOptions', riderOptions);

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
            initialValues={initialValues}
            validate={validate}
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
                                    <Field name='params' component={AceEditor} autoFocus placeholder='Enter competition build params' />
                                </Grid>
                                <Grid item>
                                    <ErrorMessage name='params' />
                                </Grid>
                            </Grid>
                        </Grid>
                        <FormButtons
                            isSubmitting={isSubmitting}
                            dirty={dirty}
                            isValid={isValid}
                            onCancel={onCancel}
                            allowSubmitPristine={allowSubmitPristine}
                        />
                    </Form>
                );
            }}
        </Formik>
    </MuiPickersUtilsProvider>
);
export default BuildCompetitionForm;

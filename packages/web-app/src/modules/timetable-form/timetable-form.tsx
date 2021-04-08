import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { TextArea } from 'src/components/forms/formik-material-ui/formik-material-ui';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { addHours, startOfHour } from 'date-fns';
import FormButtons from 'src/components/ui/buttons/form-buttons';
import _ from 'lodash';

export interface ITimetableFormValues {
    notice?: string;
    startTime: Date;
}

interface ITimetableFormProps {
    onSubmit: (event: ITimetableFormValues) => Promise<void>;
    onCancel: () => void;
    initialValues?: ITimetableFormValues;
    showNotice?: boolean;
    allowSubmitPristine?: boolean;
}

const TimetableForm: React.FC<ITimetableFormProps> = ({ onSubmit, onCancel, initialValues, showNotice, allowSubmitPristine }) => {
    const minTime = startOfHour(addHours(new Date(), 1));

    const defaultValues = showNotice ? { notice: '', startTime: minTime } : { startTime: minTime };

    // Overwrite defaults with all non null passed in values
    const formikIinitalValues = { ...defaultValues, ..._.pickBy(initialValues, _.identity) };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Formik
                initialValues={formikIinitalValues}
                validationSchema={Yup.object({
                    startTime: Yup.date().min(minTime, 'Please pick a later date'),
                })}
                onSubmit={async (values) => {
                    await onSubmit(values);
                }}
            >
                {(props) => {
                    const { isSubmitting, isValid, dirty } = props;
                    return (
                        <Form>
                            <Grid container direction='column'>
                                <Grid container direction='column' alignItems='center' justify='center' spacing={2}>
                                    <Grid item>
                                        <Field name='startTime' component={DateTimePicker} label='Start Time' minutesStep={15} minDate={minTime} />
                                    </Grid>
                                    {showNotice && (
                                        <Grid item>
                                            <Field name='notice' component={TextArea} placeholder='Notice' />
                                        </Grid>
                                    )}
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
};

export default TimetableForm;

import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { TextArea, Select, NumericField } from 'src/components/formik-material-ui/formik-material-ui';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { CreateCompetitionInput, Gender, UpdateCompetitionInput } from 'src/generated-types';
import { addHours, startOfHour } from 'date-fns';
import FormButtons from 'src/components/ui/buttons/form-buttons';
import { CATALOG_GENDER, CATALOG_LEVEL, CATALOG_SPORT, ICatalogItem } from 'src/config/catalogs';

interface ICompetitionFormProps {
    onSubmit: (event: Omit<CreateCompetitionInput, 'eventId'> | Omit<UpdateCompetitionInput, 'id' | 'eventId'>) => Promise<void>;
    onCancel: () => void;
    initialValues?: Omit<UpdateCompetitionInput, 'id' | 'eventId'>;
    title: string;
}

const defaultFormValue = { name: '', description: '', gender: Gender.Any };

const getOptionLabel = (option: ICatalogItem) => option.description;

const ComepetitionForm: React.FC<ICompetitionFormProps> = ({ onSubmit, onCancel, title, initialValues }) => {
    console.log('ComepetitionForm');
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Formik
                initialValues={initialValues || defaultFormValue}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
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
                                        <Field name='description' component={TextArea} placeholder='Description' />
                                    </Grid>

                                    <Grid item>
                                        <Field name='sport' component={Select} label='Sport' options={CATALOG_SPORT} getOptionLabel={getOptionLabel} />
                                    </Grid>

                                    <Grid item>
                                        <Field name='gender' component={Select} label='Gender' options={CATALOG_GENDER} getOptionLabel={getOptionLabel} />
                                    </Grid>

                                    <Grid item>
                                        <Field name='level' component={Select} label='Skill Level' options={CATALOG_LEVEL} getOptionLabel={getOptionLabel} />
                                    </Grid>

                                    <Grid item>
                                        <Field name='maxRiders' component={NumericField} />
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

export default ComepetitionForm;

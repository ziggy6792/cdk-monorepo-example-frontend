/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, TextField as MUITextField } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { TextArea, Select, NumericField } from 'src/components/forms/formik-material-ui/formik-material-ui';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Gender, Level, Sport, useListUsersQuery } from 'src/generated-types';

import FormButtons from 'src/components/ui/buttons/form-buttons';
import { CATALOG_GENDER, CATALOG_LEVEL, CATALOG_SPORT, ICatalogItem } from 'src/config/catalogs';
import { AutocompleteRenderInputParams } from '@material-ui/lab';
import { Autocomplete } from 'formik-material-ui-lab';

export interface IUserOption {
    id: string;
    fullName: string;
}

export interface ICompetitionFormValues {
    name: string;
    description?: string;
    judgeUser?: IUserOption;
    maxRiders?: number | '';
    gender?: Gender;
    sport?: Sport;
    level?: Level;
}

interface ICompetitionFormProps {
    onSubmit: (formValues: ICompetitionFormValues) => Promise<void>;
    onCancel: () => void;
    initialValues?: ICompetitionFormValues;
    title: string;
}

const defaultFormValue = {
    name: '',
    description: '',
    gender: Gender.Any,
    sport: Sport.Wakeboard,
    level: Level.Any,
    maxRiders: '',
    judgeUser: null,
};

const getOptionLabel = (option: ICatalogItem) => option.description;

const ComepetitionForm: React.FC<ICompetitionFormProps> = ({ onSubmit, onCancel, title, initialValues }) => {
    console.log('ComepetitionForm');

    const { data, loading } = useListUsersQuery();

    const judgeOptions = !loading ? data.listUsers : [];

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Formik
                initialValues={initialValues || defaultFormValue}
                validationSchema={Yup.object({
                    name: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
                    judgeUser: Yup.object().nullable().required('Required'),
                })}
                onSubmit={async (values) => {
                    await onSubmit(values as ICompetitionFormValues);
                }}
            >
                {(props) => {
                    const { isSubmitting, isValid, dirty, errors, touched } = props;
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
                                        <Field name='maxRiders' component={NumericField} label='Max Riders' />
                                    </Grid>

                                    <Grid item>
                                        <Field
                                            name='judgeUser'
                                            component={Autocomplete}
                                            autoComplete
                                            options={judgeOptions}
                                            getOptionLabel={(option: IUserOption) => option.fullName}
                                            style={{ width: 300 }}
                                            renderInput={(params: AutocompleteRenderInputParams) => (
                                                <MUITextField
                                                    {...params}
                                                    error={touched.judgeUser && !!errors.judgeUser}
                                                    helperText={errors.judgeUser}
                                                    label='Judge'
                                                    variant='outlined'
                                                />
                                            )}
                                        />
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

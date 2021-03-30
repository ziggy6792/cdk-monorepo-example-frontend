/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Button, Grid, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useListUsersQuery } from 'src/generated-types';
import FormButtons from 'src/components/ui/buttons/form-buttons';
import { ICatalogItem } from 'src/config/catalogs';
import DragAndDropList from 'src/components/forms/dnd/drag-and-drop-list';
import { IRiderOption } from 'src/gql/common/types';
import _ from 'lodash';

export interface IUserOption {
    id: string;
    fullName: string;
}

export interface ISeedsFormValues {
    riders: string[];
}

interface ISeedsFormProps {
    onSubmit: (formValues: ISeedsFormValues) => Promise<void>;
    onCancel: () => void;
    initialValues?: ISeedsFormValues;
    riderOptions: IRiderOption[];
    title: string;
}

const getRiderOptionLabel = (option: IRiderOption, index: number): string => `${index + 1} ${option.user.fullName}`;

const SeedsForm: React.FC<ISeedsFormProps> = ({ onSubmit, onCancel, title, initialValues, riderOptions }) => (
    // console.log('riderOptions', riderOptions);

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
            initialValues={initialValues}
            onSubmit={async values => {
                await onSubmit(values);
            }}
        >
            {props => {
                const { isSubmitting, isValid, dirty, setFieldValue, values } = props;
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
                                    <Button
                                        variant='outlined'
                                        size='small'
                                        onClick={() => {
                                            setFieldValue('riders', _.shuffle(values.riders));
                                        }}
                                    >
                                        Randomize Order
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Field
                                        name='riders'
                                        component={DragAndDropList}
                                        options={riderOptions}
                                        idField='userId'
                                        loading={false}
                                        getOptionLabel={getRiderOptionLabel}
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
export default SeedsForm;

/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Field, Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, useTheme } from '@material-ui/core';
import FormButtons from 'src/components/ui/buttons/form-buttons';
import { NumericField } from 'src/components/forms/formik-material-ui/formik-material-ui';
import { ordinalSuffixOf } from 'src/utils/utility';

export interface IScoreRunFormValues {
    runScores: number[];
}

export interface IScoreFormPosition {
    position: number;
    isJoint?: boolean;
}

interface IScoreRunFormProps {
    onSubmit: (formValues: IScoreRunFormValues) => Promise<void>;
    onCancel: () => void;
    initialValues?: IScoreRunFormValues;
    title: string;
    currentPosition?: IScoreFormPosition;
    getUpdatedPosition: (formValues: IScoreRunFormValues) => IScoreFormPosition;
}

const getPositionDisplayText = ({ position, isJoint }: IScoreFormPosition): string =>
    position !== null ? (isJoint ? 'Tied ' : '') + ordinalSuffixOf(position) : 'Unranked';

const ScoreRunForm: React.FC<IScoreRunFormProps> = ({ onSubmit, onCancel, title, initialValues, currentPosition, getUpdatedPosition: getNewPosition }) => {
    const theme = useTheme();
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({})}
            onSubmit={async (values) => {
                await onSubmit(values);
            }}
        >
            {(props) => {
                const { isSubmitting, isValid, dirty, values } = props;
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

                            <Grid container direction='column' alignItems='center' spacing={2}>
                                <FieldArray
                                    name='scores'
                                    render={() => (
                                        <>
                                            {values?.runScores.map((run, i) => (
                                                <Grid item key={`score${i}`}>
                                                    <Field name={`runScores.${i}`} component={NumericField} label={`Run ${i + 1}`} autoFocus={i === 0} />
                                                </Grid>
                                            ))}
                                        </>
                                    )}
                                />
                            </Grid>
                            <Grid container direction='column' style={{ marginTop: theme.spacing(1) }}>
                                <Grid item>
                                    <Typography variant='subtitle2' align='center'>
                                        {`Current Rank: ${getPositionDisplayText(currentPosition)}`}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='subtitle2' align='center'>
                                        {`Updated Rank: ${getPositionDisplayText(getNewPosition(values))}`}
                                    </Typography>
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

import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { Form as FormikForm } from 'formik';

export interface IFormProps {
    title?: string;
    buttons?: React.ReactNode;
}

const Form: React.FC<IFormProps> = ({ title, children, buttons }) => (
    <FormikForm>
        <Grid container>
            {title && (
                <Grid container direction='row' justify='center'>
                    <Grid item>
                        <Typography variant='h3' gutterBottom>
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
            )}
            {children}
            {buttons && (
                <Grid container direction='row' justify='center'>
                    {buttons}
                </Grid>
            )}
        </Grid>
    </FormikForm>
);

export default Form;

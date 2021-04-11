import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { Form } from 'formik';

export interface IFormLayoutProps {
    title?: string;
    buttons?: React.ReactNode;
}

const FormLayout: React.FC<IFormLayoutProps> = ({ title, children, buttons }) => (
    <Form>
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
    </Form>
);

export default FormLayout;

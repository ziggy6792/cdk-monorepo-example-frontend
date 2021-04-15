/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Grid, Typography } from '@material-ui/core';

interface IErrorBoxProps {
  title?: React.ReactNode;
  buttons?: React.ReactNode;
}

const ErrorBox: React.FC<IErrorBoxProps> = ({ title, children, buttons }) => (
  <Grid container>
    {title && (
      <Grid container direction='row' justify='center'>
        <Grid item>
          <Typography variant='h3' gutterBottom color='error'>
            {title}
          </Typography>
        </Grid>
      </Grid>
    )}
    {children}
    {buttons && (
      <Grid container direction='row' justify='center' spacing={2}>
        {buttons}
      </Grid>
    )}
  </Grid>
);

ErrorBox.defaultProps = {
  title: 'Oh No!',
};

export default ErrorBox;

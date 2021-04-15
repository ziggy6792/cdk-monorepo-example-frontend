/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Grid, Typography, useTheme } from '@material-ui/core';

interface IIGenericErrorPropsProps {
  error: React.ReactNode;
}

interface IIGenericErrorsPropsProps {
  errors: React.ReactNode[];
}

const GenericErrorMessage: React.FC<IIGenericErrorPropsProps | IIGenericErrorsPropsProps> = (props) => {
  let errors: React.ReactNode[] = [];

  if ('error' in props) {
    errors = [props.error];
  }
  if ('errors' in props) {
    errors = [props.errors];
  }

  const [isToggle, setToggle] = useState(false);
  const theme = useTheme();

  return (
    <Grid container spacing={1} style={{ marginBottom: theme.spacing(1) }} justify='center'>
      {!isToggle && (
        <Grid item>
          <Typography color='error' onClick={() => setToggle(true)}>
            Something went wrong. Blame Vincent!
          </Typography>
        </Grid>
      )}

      {isToggle &&
        errors.map((errorItem, i) => (
          <Grid item key={`errorItem${i}`}>
            <Typography color='error' onClick={() => setToggle(false)}>
              {errorItem}
            </Typography>
          </Grid>
        ))}
    </Grid>
  );
};

export default GenericErrorMessage;

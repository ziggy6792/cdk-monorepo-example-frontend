import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

const Spinner = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{
        minHeight: '100vh',
        position: 'absolute',
        left: '0',
        top: '0',
        // zIndex: '5000',
      }}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default Spinner;

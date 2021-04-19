import React from 'react';

import { Grid, Typography } from '@material-ui/core';

const NoLiveHeats: React.FC = () => (
  // ToDo set the height properly
  <Grid container justify='center' alignItems='center' style={{ height: 'calc(100vh - 220px)' }}>
    <Grid item>
      <Typography variant='h6' component='div' color='primary' style={{ textAlign: 'center', lineHeight: 1.2, textTransform: 'none' }}>
        There are currently no live heats.
        <br />
        Check back in a bit!
      </Typography>
    </Grid>
  </Grid>
);

export default NoLiveHeats;

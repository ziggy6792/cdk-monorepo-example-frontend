/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { Grid, Typography } from '@material-ui/core';
import React from 'react';

interface SummaryProps {
  name: string;
  description?: string;
}

const Summary: React.FC<SummaryProps> = ({ name, description, children }) => (
  <>
    <Grid container style={{ padding: 16 }}>
      <Grid item>
        <Typography variant='h4'>{name}</Typography>
        {children}
      </Grid>
      <Grid item />
    </Grid>
    {description && (
      <Grid container style={{ padding: 16 }}>
        <Grid item>
          <Typography
            style={{
              fontSize: '1rem',
              margin: '0 30px',
              background: '#eee',
              padding: '2px 8px',
              borderRadius: '8px',
            }}
          >
            {description}
          </Typography>
        </Grid>
      </Grid>
    )}
  </>
);

export default Summary;

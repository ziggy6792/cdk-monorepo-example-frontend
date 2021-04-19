/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { Grid, Typography } from '@material-ui/core';
import React from 'react';

interface SummaryProps {
  title: string;
  subtitle: string;
  description?: string;
}

const Summary: React.FC<SummaryProps> = ({ title, subtitle, description, children }) => (
  <>
    <Grid container style={{ padding: '0 16px 0' }}>
      <Grid item xs={12}>
        <Typography variant='subtitle2'>{title}</Typography>
        <Typography variant='h3'>{subtitle}</Typography>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
      {description && (
        <Grid item xs={12}>
          <Typography
            style={{
              fontSize: '1rem',
              padding: '2px 8px',
              borderRadius: '8px',
              background: '#ddd',
            }}
            color='textPrimary'
          >
            {description}
          </Typography>
        </Grid>
      )}
    </Grid>
  </>
);

export default Summary;

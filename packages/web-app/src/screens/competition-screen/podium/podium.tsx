import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import _ from 'lodash';
import styles from './podium.module.css';

interface IPodiumProps {
  some?: string;
}

const Podium: React.FC<IPodiumProps> = () => (
  <>
    <Grid container direction='row' justify='space-around'>
      <Grid item>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Grid item>
            <div className={styles.second}>
              <Grid container direction='row' justify='center' alignItems='flex-end' style={{ height: '100%' }}>
                <Grid item>
                  <Typography style={{ color: 'white' }}>2nd</Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: '0.8rem' }}>Simon Verhoven</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Grid item>
            <div className={styles.first}>
              <Grid container direction='row' justify='center' alignItems='flex-end' style={{ height: '100%' }}>
                <Grid item>
                  <Typography style={{ color: 'white' }}>1st</Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: '0.8rem' }}>Chi Le</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Grid item>
            <div className={styles.thrid}>
              <Grid container direction='row' justify='center' alignItems='flex-end' style={{ height: '100%' }}>
                <Grid item>
                  <Typography style={{ color: 'white' }}>3rd</Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: '0.8rem' }}>Vincent De Smet</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>
);

export default Podium;

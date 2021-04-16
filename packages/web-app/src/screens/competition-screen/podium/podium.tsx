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
        <div className={styles.second}>
          <Grid container direction='row' justify='center' alignItems='flex-end' style={{ height: '100%' }}>
            <Grid item>
              <Typography style={{ color: 'white' }}>2nd</Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
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
        <div className={styles.thrid}>
          <Grid container direction='row' justify='center' alignItems='flex-end' style={{ height: '100%' }}>
            <Grid item>
              <Typography style={{ color: 'white' }}>3rd</Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
    <Grid container direction='row' justify='space-around'>
      <Grid item>
        <Typography>Simon Verhoven</Typography>
      </Grid>
      <Grid item>
        <Typography>Chi Le</Typography>
      </Grid>
      <Grid item>
        <Typography>Vincent De Smet</Typography>
      </Grid>
    </Grid>
    {/* <div style={{ backgroundImage: `url(data:image/svg+xml;base64,${btoa(PodiumImage)})`, width: '200px', height: '200px' }} /> */}
    {/* <PodiumImage /> */}
  </>
);

export default Podium;

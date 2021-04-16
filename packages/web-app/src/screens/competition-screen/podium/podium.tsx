import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import _ from 'lodash';
// eslint-disable-next-line no-restricted-imports
import PodiumImage from '../../../assets/podium.svg';
import styles from './podium.module.css';

interface IPodiumProps {
  some?: string;
}

const Podium: React.FC<IPodiumProps> = () => (
  <>
    <Grid container direction='row' justify='center'>
      <Grid item style={{ width: '87%' }}>
        <div className={styles.podium2} />
      </Grid>
    </Grid>
    <Grid container direction='row' justify='space-around' style={{ marginTop: '-70px', height: '50px' }}>
      <Grid item>
        <Typography style={{ color: 'white' }}>2nd</Typography>
      </Grid>
      <Grid item>
        <Typography style={{ color: 'white' }}>1st</Typography>
      </Grid>
      <Grid item>
        <Typography style={{ color: 'white' }}>3rd</Typography>
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

import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import _ from 'lodash';
import { IWinnerItem } from 'src/gql/common/types';
import styles from './podium.module.css';

interface IPodiumProps {
  winners: IWinnerItem[];
}

const podiumItems = [
  {
    style: styles.second,
    text: '2nd',
    positionIndex: 1,
  },
  {
    style: styles.first,
    text: '1st',
    positionIndex: 0,
  },
  {
    style: styles.thrid,
    text: '3rd',
    positionIndex: 2,
  },
];

const Podium: React.FC<IPodiumProps> = ({ winners }) => (
  <>
    <Grid container direction='row' justify='space-around'>
      {podiumItems.map((podiumItem) => (
        <Grid item>
          <Grid container direction='column' justify='center' alignItems='center'>
            <Grid item>
              <div className={podiumItem.style}>
                <Grid container direction='row' justify='center' alignItems='flex-end' style={{ height: '100%' }}>
                  <Grid item>
                    <Typography style={{ color: 'white' }}>{podiumItem.text}</Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: '0.8rem' }}>{winners[podiumItem.positionIndex].user.fullName}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  </>
);

export default Podium;

import React from 'react';
import clsx from 'clsx';
import { Chip, makeStyles, Typography } from '@material-ui/core';
import CircleIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    fontWeight: 900,
    letterSpacing: '-1px',
    background: 'white',
  },
  circleIcon: {
    color: '#e74c3c',
    height: 10,
    width: 10,
  },
  largeWrapper: {
    fontSize: '2rem'
  },
  largeIcon: {
    height: 30,
    width: 30
  }
}));

interface LiveIndicatorProps {
  large?: boolean
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({ large = false }) => {
  const classes = useStyles();

  return (
    <Chip
      size={large ? 'medium' : 'small'}
      avatar={<CircleIcon className={classes.circleIcon} />}
      label="LIVE"
      className={classes.wrapper}
    />
  );
};

export default LiveIndicator;

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
    color: '#e74c3c !important',
    height: 10,
    width: 10,
  },
  pulse: {
    animationName: '$pulse',
    animationDuration: '2s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite'
  },
  '@keyframes pulse':{
    "0%": {
      opacity: 0,
    },
    "25%": {
      opacity: 1,
    },
    "75%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  }

}));

interface LiveIndicatorProps {
  large?: boolean;
  pulse?: boolean
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({ large = false, pulse = false }) => {
  const classes = useStyles();

  return (
    <Chip
      size={large ? 'medium' : 'small'}
      avatar={<CircleIcon className={classes.circleIcon} />}
      label="LIVE"
      className={clsx(classes.wrapper, {[classes.pulse]: pulse})}
    />
  );
};

export default LiveIndicator;

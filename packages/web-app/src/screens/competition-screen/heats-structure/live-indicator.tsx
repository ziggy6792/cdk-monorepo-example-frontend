import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import CircleIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    color: '#323232',
    whiteSpace: 'nowrap',
    fontSize: '0.7rem',
    fontWeight: 900,
    letterSpacing: '-1px',
    background: 'white',
    borderRadius: '35px',
    padding: '1px 5px',
    margin: theme.spacing(0,0.5),
    border: '1px solid #ddd',
  },
  circleIcon: {
    color: '#e74c3c',
    height: 10,
    width: 10,
  },
}));

const LiveIndicator: React.FC = () => {
  const classes = useStyles();
  return (
    <Typography component='div' className={classes.wrapper}>
      <CircleIcon className={classes.circleIcon} /> LIVE
    </Typography>
  );
};

export default LiveIndicator;

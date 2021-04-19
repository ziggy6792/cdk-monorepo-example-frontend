import React from 'react';
import clsx from 'clsx';

import { createStyles, makeStyles, Theme, Typography, Toolbar, AppBar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 100
    },
    toolbar: {
      display: 'block',
      transition: theme.transitions.create(['minHeight', 'padding'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    denseBar: {
      minHeight: 40,
      padding: theme.spacing(1),
    },
    normalBar: {
      minHeight: 56,
      padding: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: 'white',
    },
    denseTitle: {
      fontSize: '2rem'
    }, 
    normalTitle: {
      fontSize: '2.5rem'
    },
    date: {
      color: '#ffffffcc',
      lineHeight: 0.9,
    },
    denseDate: {
      fontSize: '1rem',
      marginTop: 2
    },
    normalDate: {
      fontSize: '1.2rem',
      marginTop: 8
    },
  })
);

/*
TODO
- Make Avatar more compex with a dropdown (Profile)
*/

interface TopNavProps {
  eventTitle?: string;
  dateString?: string;
  dense?: boolean
}

const TopNavigation: React.FC<TopNavProps> = ({ eventTitle, dateString, dense = false }) => {
  const classes = useStyles();

  const navBarTitle = eventTitle || 'Tournament'
  const navBarSubtitle =  dateString || '24th April 2021';

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar
          className={
            clsx(classes.toolbar, {
              [classes.denseBar]: dense,
              [classes.normalBar]: !dense,
            })}
          variant="dense"
        >
          <Typography
            variant='h3'
            className={clsx(classes.title, {
              [classes.denseTitle]: dense,
              [classes.normalTitle]: !dense,
            })}
            component="div"
          >
            {navBarTitle}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            color="textPrimary"
            className={clsx(classes.date, {
              [classes.denseDate]: dense,
              [classes.normalDate]: !dense,
            })}
          >
            {navBarSubtitle}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
};

export default TopNavigation;

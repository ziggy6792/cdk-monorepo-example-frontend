import React, { useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router';

import { createStyles, makeStyles, Theme, Typography, Toolbar, AppBar, Card, CardContent, Grid } from '@material-ui/core';
import { closestIndexTo } from 'date-fns';
import { EventNote, AccountTree, MonetizationOn } from '@material-ui/icons';
import { ROUTE_SCOREBOARD, ROUTE_TIMETABLE } from 'src/config/routes';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'sticky',
      top: 0,
      width: '100%',
      height: 220,
    },
    toolbar: {
      display: 'block',
      padding: theme.spacing(4,2,2),
      transition: theme.transitions.create(['minHeight', 'padding'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    denseBar: {
      minHeight: 40
    },
    normalBar: {
      minHeight: 56,
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
    shortcutsWrapper: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(1, 2, 2),
      background: '#ffffff33'
    },
    shortcut: {
      padding: theme.spacing(1)
    }
  })
);

/*
TODO
- Make Avatar more compex with a dropdown (Profile)
*/

interface TopNavProps {
  eventTitle?: string;
  eventId?: string;
  dateString?: string;
  currentPath?: string;
}

const TopNavigation: React.FC<TopNavProps> = ({ eventTitle, dateString, eventId, currentPath = 'default' }) => {
  const classes = useStyles();
  const history = useHistory();

  const [navBarType, setNavBarType] = useState("normal");
  const navBarTitle = 'Back 2 Basics 2021' || eventTitle || 'Tournament'
  const navBarSubtitle = '24th April 2021' || dateString;



  let prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    if ((prevScrollpos > currentScrollPos) && (navBarType === "dense")) {
      setNavBarType("normal");
    } else if ((prevScrollpos < currentScrollPos) && (navBarType === "normal")) {
      setNavBarType("dense");
    }
    prevScrollpos = currentScrollPos;
  }

  


  const shortcuts = [
    {
      label: 'Timetable',
      icon: <EventNote color='primary' fontSize='large' />,
      route: ROUTE_TIMETABLE
    },
    {
      label: 'Tournament',
      icon: <AccountTree color='primary' fontSize='large' style={{ transform: "scaleX(-1)" }} />,
      route: ROUTE_SCOREBOARD
    },
    {
      label: 'Sponsors',
      icon: <MonetizationOn color='primary' fontSize='large' />,
      route: 'sponsors'
    },
    
  ]

  const Shortcut = ({ label, icon, route }) => {
    const isRoute = label === currentPath;
    return (
      <Card
        // style={{ border: isRoute ? '3px solid #ffffff' : '3px solid #5093c2' }}
        elevation={isRoute ? 10 : 0}
        onClick={() => {
          history.push(`${route}/${eventId}`);
        }}
      >
        <Grid container direction='column' alignItems='center' className={classes.shortcut}>
          <Grid item xs={12}>
            {icon}
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6' color="primary">
              {label}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    )
  }
  

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar
          className={
            clsx(classes.toolbar, {
              [classes.denseBar]: navBarType === "dense",
              [classes.normalBar]: navBarType === "normal",
            })}
          variant="dense"
        >
          <Typography
            variant='h3'
            className={clsx(classes.title, {
              [classes.denseTitle]: navBarType === "dense",
              [classes.normalTitle]: navBarType === "normal",
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
              [classes.denseDate]: navBarType === "dense",
              [classes.normalDate]: navBarType === "normal",
            })}
          >
            {navBarSubtitle}
          </Typography>
        </Toolbar>
        {(navBarType === "normal") && (
          <Grid container spacing={2} className={classes.shortcutsWrapper}>
            {shortcuts.map(shortcut => {
              console.log(shortcut);
              return (
                <Grid item xs={4}>
                  <Shortcut label={shortcut.label} icon={shortcut.icon} route={shortcut.route} />
                </Grid>
            )})}
          </Grid>
        )}
      </AppBar>
    </div>
  )
};

export default TopNavigation;

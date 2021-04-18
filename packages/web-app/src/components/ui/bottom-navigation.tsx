import React from 'react';
import { useHistory } from 'react-router';

import { 
  createStyles, 
  makeStyles, 
  Theme, 
  Card, 
  BottomNavigation as MuiBottomNavigation, 
  BottomNavigationAction 
} from '@material-ui/core';
import { EventNote, AccountTree, Home, AccountCircle, ControlCamera } from '@material-ui/icons';
import { ROUTE_LIVE, ROUTE_TIMETABLE, ROUTE_PROFILE, ROUTE_EVENT, ROUTE_TOURNAMENT } from 'src/config/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'fixed',
      bottom: 0,
      width: '100%',
      background: 'white',
      boxShadow: '0px 0px 20px 0px #797979',
      transition: theme.transitions.create(['background', 'color'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })
);

/*
TODO
- Make Avatar more compex with a dropdown (Profile)
*/

interface BottomNavProps {
  eventTitle?: string;
  eventId?: string;
  dateString?: string;
  currentPath: 'tournament' | 'live' | 'overall' | 'timetable' | 'profile';
}

const BottomNavigation: React.FC<BottomNavProps> = ({ eventId, currentPath }) => {
  const classes = useStyles();
  const history = useHistory();
  
  const routes = {
    "tournament": ROUTE_TOURNAMENT,
    "timetable": ROUTE_TIMETABLE,
    "overall": ROUTE_EVENT,
    "live": ROUTE_LIVE,
    "profile": ROUTE_PROFILE,
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    history.push(`${routes[newValue]}/${eventId}`);
  };

  return (
    <Card className={classes.root}>
      <MuiBottomNavigation value={currentPath} showLabels onChange={handleChange} className={classes.root}>
        {/* <BottomNavigationAction label="Tournament" value="tournament" icon={<AccountTree style={{ transform: "scaleX(-1)" }} />} /> */}
        <BottomNavigationAction label="Overall" value="overall" icon={<Home />} />
        <BottomNavigationAction label="Timetable" value="timetable" icon={<EventNote />} />
        <BottomNavigationAction label="Live" value="live" icon={<ControlCamera />} />
        <BottomNavigationAction label="Admin" value="profile" icon={<AccountCircle />} />
      </MuiBottomNavigation>      
    </Card>
  )
};

export default BottomNavigation;

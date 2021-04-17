import React from 'react';
import clsx from 'clsx';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import TopNavigation from './top-navigation';
import BottomNavigation from './bottom-navigation'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    normalContent: {
      padding: '90px 0 40px'
    },
    denseContent: {
      padding: '60px 0 40px'
    },
  })
);

/*
TODO
- Make Avatar more compex with a dropdown (Profile)
*/

interface ScreenWrapperProps {
  eventTitle?: string;
  eventId?: string;
  dateString?: string;
  currentPath: 'tournament' | 'live' | 'overall' | 'timetable' | 'profile';
  dense?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ eventTitle, dateString, eventId, currentPath, dense, children }) => {
  const classes = useStyles();

  return (
    <>
      <TopNavigation eventTitle={eventTitle} dateString={dateString} dense={dense} />
      <div className={clsx({[classes.normalContent]: !dense, [classes.denseContent]: dense})}>
        {children}
      </div>
      <BottomNavigation eventTitle={eventTitle} eventId={eventId} currentPath={currentPath} />
    </>
  )
};

export default ScreenWrapper;
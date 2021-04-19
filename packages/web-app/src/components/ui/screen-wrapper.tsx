import React from 'react';
import clsx from 'clsx';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Spinner from 'src/components/spinner';
import TopNavigation from './top-navigation';
import BottomNavigation from './bottom-navigation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    normalContent: {
      padding: '100px 0 140px',
      zIndex: 0
    },
    denseContent: {
      padding: '70px 0 140px',
      zIndex: 0
    },
    onlyBottomContent: {
      padding: '0 0 140px',
      zIndex: 0
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
  onlyBottom?: boolean;
  showSpinner: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ eventTitle, dateString, eventId, currentPath, dense, onlyBottom = false, showSpinner, children }) => {
  const classes = useStyles();

  return (
    <>
      {!onlyBottom && <TopNavigation eventTitle={eventTitle} dateString={dateString} dense={dense} />}
      <div
        className={clsx({
          [classes.normalContent]: !dense && !onlyBottom,
          [classes.denseContent]: dense && !onlyBottom,
          [classes.onlyBottomContent]: onlyBottom,
        })}
      >
        {showSpinner && <Spinner />}
        {!showSpinner && children}
      </div>
      <BottomNavigation eventTitle={eventTitle} eventId={eventId} currentPath={currentPath} />
    </>
  );
};

export default ScreenWrapper;

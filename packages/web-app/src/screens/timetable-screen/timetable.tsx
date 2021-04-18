/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import _ from 'lodash';
import { Grid, Typography, useTheme, makeStyles, Divider } from '@material-ui/core';
import { startOfDay, parseISO } from 'date-fns';
import DateFormatter from 'src/utils/format/date-formatter';
import { TimetableScheduleItem } from 'src/gql/common/types';
import ScreenWrapper from 'src/components/ui/screen-wrapper';
import TimetableRow from './timetable-row';
import AddNotice from './buttons/add-notice';

export const useStyles = makeStyles((theme) => ({
  dayPartition: {
    background: '#ddd',
    padding: theme.spacing(1, 1),
    margin: theme.spacing(2, -0.5, 1)
  },
}));

export interface TimetableProps {
  scheduleItems: TimetableScheduleItem[];
  eventId: string;
  isAdmin: boolean;
}

interface DayPartitionProps {
  day: Date;
}

const DayPartition: React.FC<DayPartitionProps> = ({ day }) => {
  const classes = useStyles();
  return(
    <Typography variant='h4' color='textPrimary' component='div'>
      <Grid container spacing={1} justify='space-between' className={classes.dayPartition}>
        <Grid item>
          {DateFormatter.toShortDate(day)}
        </Grid>
        <Grid item>
          {DateFormatter.toShortDay(day)}
        </Grid>
      </Grid>
    </Typography>
  )
};

const Timetable: React.FC<TimetableProps> = ({ scheduleItems, eventId, isAdmin }) => {
  const groupedItems = _.groupBy(scheduleItems, (scheduleItem) =>
    scheduleItem.startTime ? startOfDay(scheduleItem.startTime).toISOString() : new Date(0).toISOString()
  );

  const scheduleDays = Object.keys(groupedItems).map((key) => ({
    day: key === new Date(0).toISOString() ? null : parseISO(key),
    scheduleItems: _.orderBy(groupedItems[key], [({ startTime }) => startTime, ({ createdAt }) => createdAt], ['asc', 'asc']) as TimetableScheduleItem[],
  }));

  const theme = useTheme();

  return (
    <ScreenWrapper eventId={eventId} currentPath="timetable">
      <Grid container direction='column' justify='center' alignItems='flex-start'>
        <Grid item style={{ margin: theme.spacing(2,0,3) }}>
          <Typography variant='h3' color='textSecondary'>Timetable</Typography>
        </Grid>
      </Grid>
      <Grid container direction='column' justify='center' alignItems='center'>
        {scheduleDays.map(({ day, scheduleItems }) => (
          <Grid item key={day?.toISOString() || 'null'} style={{ marginBottom: theme.spacing(2), width: 'fit-content', minWidth: '100%' }}>
            {day && <DayPartition day={day} />}
            {scheduleItems.map((scheduleItem, i) => (
              <>
                {i !== 0 && <Divider />}
                <TimetableRow scheduleItem={scheduleItem} eventId={eventId} key={scheduleItem.id} isAdmin={isAdmin} />
              </>
            ))}
          </Grid>
        ))}
        {isAdmin && (
          <Grid container direction='column' justify='center' alignItems='center'>
            <Grid item>
              <AddNotice eventId={eventId} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </ScreenWrapper>
  );
};

export default Timetable;

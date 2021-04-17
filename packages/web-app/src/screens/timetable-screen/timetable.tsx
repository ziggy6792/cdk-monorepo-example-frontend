/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import _ from 'lodash';
import { Grid, Typography, useTheme } from '@material-ui/core';
import { startOfDay, parseISO } from 'date-fns';
import DateFormatter from 'src/utils/format/date-formatter';
import { TimetableScheduleItem } from 'src/gql/common/types';
import ScreenWrapper from 'src/components/ui/screen-wrapper';
import TimetableRow from './timetable-row';
import AddNotice from './buttons/add-notice';

export interface TimetableProps {
  scheduleItems: TimetableScheduleItem[];
  eventId: string;
  isAdmin: boolean;
}

interface DayPartitionProps {
  day: Date;
}

const DayPartition: React.FC<DayPartitionProps> = ({ day }) => (
  <Grid container spacing={1} justify='space-between'>
    <Grid item>
      <Typography>{DateFormatter.toShortDate(day)}</Typography>
    </Grid>
    <Grid item>
      <Typography>{DateFormatter.toShortDay(day)}</Typography>
    </Grid>
  </Grid>
);

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
    <ScreenWrapper eventId={eventId} currentPath="timetable" >
      <Grid container direction='column' justify='center' alignItems='center'>
        <Grid item style={{ marginBottom: theme.spacing(2) }}>
          <Typography>Timetable</Typography>
        </Grid>
      </Grid>
      <Grid container direction='column' justify='center' alignItems='center'>
        {scheduleDays.map(({ day, scheduleItems }) => (
          <Grid item key={day?.toISOString() || 'null'} style={{ width: '400px', marginBottom: theme.spacing(2) }}>
            {day && <DayPartition day={day} />}
            {scheduleItems.map((scheduleItem) => (
              <TimetableRow scheduleItem={scheduleItem} eventId={eventId} key={scheduleItem.id} isAdmin={isAdmin} />
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

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import _ from 'lodash';
import { Grid, Typography, useTheme } from '@material-ui/core';
import { startOfDay, parseISO } from 'date-fns';
import DateFormatter from 'src/utils/format/date-formatter';
import { TimetableScheduleItem } from 'src/gql/common/types';
import TimetableEntry from './timetable-entry';
import TimetableRow from './timetable-row';

export interface TimetableProps {
    scheduleItems: TimetableScheduleItem[];
    eventId: string;
}

interface DayPartitionProps {
    day: Date;
}

const DayPartition: React.FC<DayPartitionProps> = ({ day }) => (
    <Grid container spacing={1} justify='space-between'>
        <Grid item>{DateFormatter.toShortDate(day)}</Grid>
        <Grid item>{DateFormatter.toDay(day)}</Grid>
    </Grid>
);

const Timetable: React.FC<TimetableProps> = ({ scheduleItems, eventId }) => {
    const groupedItems = _.groupBy(scheduleItems, (scheduleItem) =>
        scheduleItem.startTime ? startOfDay(scheduleItem.startTime).toISOString() : new Date(0).toISOString()
    );

    const scheduleDays = Object.keys(groupedItems).map((key) => ({
        day: key === new Date(0).toISOString() ? null : parseISO(key),
        scheduleItems: groupedItems[key] as TimetableScheduleItem[],
    }));

    const theme = useTheme();

    return (
        <>
            <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item style={{ marginBottom: theme.spacing(2) }}>
                    <Typography>Timetable</Typography>
                </Grid>
            </Grid>
            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                {scheduleDays.map(({ day, scheduleItems }) => (
                    <Grid item key={day?.toISOString() || 'null'} style={{ width: '400px' }}>
                        {day && <DayPartition day={day} />}
                        {scheduleItems.map((scheduleItem) => (
                            <TimetableRow scheduleItem={scheduleItem} eventId={eventId} key={scheduleItem.id} />
                        ))}
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Timetable;

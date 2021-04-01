/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button, Grid, Link } from '@material-ui/core';
import DateFormatter from 'src/utils/format/date-formatter';
import { TimetableScheduleItem } from 'src/gql/common/types';
import Dialog from 'src/components/ui/dialog';
import TimetableForm from 'src/modules/timetable-form/timetable-form';
import TimetableEntry from './timetable-entry';

export interface TimetableProps {
    scheduleItems: TimetableScheduleItem[];
}

interface ITimetableRowProps {
    scheduleItem: TimetableScheduleItem;
}

const TimetableRow: React.FC<ITimetableRowProps> = ({ scheduleItem }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Dialog open={open} setOpen={setOpen}>
                <TimetableForm onSubmit={async formValues => console.log(formValues)} title='Edit Timetable' onCancel={() => setOpen(false)} />
            </Dialog>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Link
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        {scheduleItem.startTime ? DateFormatter.toTime(scheduleItem.startTime) : 'Select time...'}
                    </Link>
                </Grid>
                <Grid item xs={8}>
                    <TimetableEntry scheduledItem={scheduleItem.scheduledItem} key={scheduleItem.schedulableId} />
                </Grid>
            </Grid>
        </>
    );
};

export default TimetableRow;

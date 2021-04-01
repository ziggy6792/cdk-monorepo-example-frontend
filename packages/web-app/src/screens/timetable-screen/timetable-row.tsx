/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button, Grid, Link } from '@material-ui/core';
import DateFormatter from 'src/utils/format/date-formatter';
import { TimetableScheduleItem } from 'src/gql/common/types';
import Dialog from 'src/components/ui/dialog';
import TimetableForm, { ITimetableFormValues } from 'src/modules/timetable-form/timetable-form';
import { useUpdateScheduleItemMutation } from 'src/generated-types';
import { GET_EVENT_SCHEDULE } from 'src/gql/queries/event.gql';
import TimetableEntry from './timetable-entry';

interface ITimetableRowProps {
    scheduleItem: TimetableScheduleItem;
    eventId: string;
}

const TimetableRow: React.FC<ITimetableRowProps> = ({ scheduleItem, eventId }) => {
    const [open, setOpen] = useState(false);

    const [updateScheduleItem] = useUpdateScheduleItemMutation({
        refetchQueries: [
            {
                query: GET_EVENT_SCHEDULE,
                variables: { id: eventId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const onUpdateScheduleItem = async (formValues: ITimetableFormValues): Promise<void> => {
        const result = await updateScheduleItem({ variables: { input: { id: scheduleItem.id, ...formValues } } });
        setOpen(false);
        return null;
    };

    return (
        <>
            <Dialog open={open} setOpen={setOpen}>
                <TimetableForm
                    onSubmit={onUpdateScheduleItem}
                    initialValues={{ startTime: scheduleItem.startTime }}
                    title='Edit Timetable'
                    onCancel={() => setOpen(false)}
                />
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
                    <TimetableEntry scheduleItem={scheduleItem} key={scheduleItem.id} />
                </Grid>
            </Grid>
        </>
    );
};

export default TimetableRow;

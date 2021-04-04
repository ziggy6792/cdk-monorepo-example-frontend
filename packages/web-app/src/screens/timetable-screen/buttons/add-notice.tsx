/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';

import _ from 'lodash';
import { Button, Grid, useTheme } from '@material-ui/core';

import { CreateEventInput, useCreateEventMutation, useCreateScheduleItemMutation } from 'src/generated-types';
import { GET_EVENT_SCHEDULE, LIST_EVENTS } from 'src/gql/queries/event.gql';
import Dialog from 'src/components/ui/dialog';
import EventForm from 'src/modules/event-form';
import { useHistory } from 'react-router';
import { ROUTE_EVENT, ROUTE_COMPETITION_MANAGER } from 'src/config/routes';
import TimetableForm from 'src/modules/timetable-form';
import { ITimetableFormValues } from 'src/modules/timetable-form/timetable-form';

interface IAddNoticeProps {
    eventId: string;
}

const AddNotice: React.FC<IAddNoticeProps> = ({ eventId }) => {
    const theme = useTheme();

    const history = useHistory();

    const [open, setOpen] = useState(false);

    const [updateScheduleItem] = useCreateScheduleItemMutation({
        refetchQueries: [
            {
                query: GET_EVENT_SCHEDULE,
                variables: { id: eventId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const onUpdateScheduleItem = async (formValues: ITimetableFormValues): Promise<void> => {
        const result = await updateScheduleItem({ variables: { input: { scheduleId: eventId, ...formValues } } });
        setOpen(false);
        return null;
    };

    return (
        <>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                Add Notice
            </Button>

            <Dialog open={open} setOpen={setOpen}>
                <TimetableForm onSubmit={onUpdateScheduleItem} title='Add Notice' onCancel={() => setOpen(false)} showNotice />
            </Dialog>
        </>
    );
};

export default AddNotice;

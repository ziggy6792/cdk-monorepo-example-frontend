/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';

import _ from 'lodash';
import { Button, Grid, useTheme } from '@material-ui/core';

import { UpdateEventInput, useUpdateEventMutation } from 'src/generated-types';
import { GET_EVENT, LIST_EVENTS } from 'src/gql/queries/event.gql';
import Dialog from 'src/components/ui/dialog';
import EventForm from 'src/modules/event-form';

interface IEditEventProps {
    eventToEdit: UpdateEventInput;
}

const EditEvent: React.FC<IEditEventProps> = ({ eventToEdit }) => {
    const { id } = eventToEdit;

    const theme = useTheme();

    const [updateEvent] = useUpdateEventMutation({
        refetchQueries: [
            {
                query: GET_EVENT,
                variables: { id },
            },
            {
                query: LIST_EVENTS,
            },
        ],
        awaitRefetchQueries: true,
    });

    const [open, setOpen] = useState(false);

    const onUpdateEvent = async (event: Omit<UpdateEventInput, 'id'>): Promise<void> => {
        await updateEvent({ variables: { input: { ...event, id } } });
        setOpen(false);
        return null;
    };

    return (
        <>
            <Grid container direction='column'>
                <Grid container direction='row' justify='center' style={{ marginTop: theme.spacing(2) }}>
                    <Grid item>
                        <Button
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Edit Event
                        </Button>
                    </Grid>
                </Grid>
                <Dialog open={open} setOpen={setOpen}>
                    <EventForm onSubmit={onUpdateEvent} title='Edit Event' onCancel={() => setOpen(false)} initialValues={eventToEdit} />
                </Dialog>
            </Grid>
        </>
    );
};

export default EditEvent;

/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';

import _ from 'lodash';
import { Button, Grid, useTheme } from '@material-ui/core';

import { CreateEventInput, useCreateEventMutation } from 'src/generated-types';
import { LIST_EVENTS } from 'src/gql/event.gql';
import Dialog from 'src/components/ui/dialog';
import CreateEventForm from 'src/modules/create-event-form';
import { useHistory } from 'react-router';
import { ROUTE_EVENT } from 'src/config/routes';

const CreateEvent: React.FC = () => {
    const theme = useTheme();

    const history = useHistory();

    const [createEvent] = useCreateEventMutation({
        refetchQueries: [
            {
                query: LIST_EVENTS,
            },
        ],
        awaitRefetchQueries: true,
    });

    const [open, setOpen] = useState(false);

    const onCreateEvent = async (event: CreateEventInput): Promise<void> => {
        const result = await createEvent({ variables: { input: event } });
        setOpen(false);
        history.push(`${ROUTE_EVENT}/${result.data.createEvent.id}`);
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
                            Create Event
                        </Button>
                    </Grid>
                </Grid>
                <Dialog open={open} setOpen={setOpen}>
                    <CreateEventForm onSubmit={onCreateEvent} title='Create New Event' onCancel={() => setOpen(false)} />
                </Dialog>
            </Grid>
        </>
    );
};

export default CreateEvent;

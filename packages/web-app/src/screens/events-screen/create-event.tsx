/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';

import _ from 'lodash';
import { Button, Grid, useTheme } from '@material-ui/core';

import { useCreateEventMutation } from 'src/generated-types';
import { LIST_EVENTS } from 'src/gql/event.gql';
import Dialog from 'src/components/ui/dialog';
import CreateEventForm from 'src/modules/create-event-form/create-event-form';

const CreateEvent: React.FC = () => {
    const theme = useTheme();

    const [createEvent] = useCreateEventMutation({
        refetchQueries: [
            {
                query: LIST_EVENTS,
            },
        ],
        awaitRefetchQueries: true,
    });

    const [open, setOpen] = useState(false);

    return (
        <>
            <Grid container direction='column'>
                <Grid container direction='row' justify='center' style={{ marginTop: theme.spacing(2) }}>
                    <Grid item>
                        <Button
                            onClick={() => {
                                // console.log('click');
                                // createEvent({ variables: { input: { name: 'Test Event', startTime: new Date() } } });
                                setOpen(true);
                            }}
                        >
                            Create Event
                        </Button>
                    </Grid>
                </Grid>
                <Dialog open={open} setOpen={setOpen}>
                    <CreateEventForm />
                    {/* <div>form</div> */}
                </Dialog>
            </Grid>
        </>
    );
};

export default CreateEvent;

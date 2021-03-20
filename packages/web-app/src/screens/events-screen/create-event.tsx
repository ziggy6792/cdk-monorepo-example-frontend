/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';

import _ from 'lodash';
import { Button, Grid, useTheme } from '@material-ui/core';

import { useCreateEventMutation } from 'src/generated-types';
import { LIST_EVENTS } from 'src/gql/event.gql';

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

    return (
        <>
            <Grid container direction='column'>
                <Grid container direction='row' justify='center' style={{ marginTop: theme.spacing(2) }}>
                    <Grid item>
                        <Button
                            onClick={() => {
                                // console.log('click');
                                createEvent({ variables: { input: { name: 'Test Event', startTime: new Date() } } });
                            }}
                        >
                            Create Event
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default CreateEvent;

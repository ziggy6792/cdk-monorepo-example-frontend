/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import MUIDataTable from 'mui-datatables';

import _ from 'lodash';
import { Button, Grid, useTheme } from '@material-ui/core';

import { useHistory } from 'react-router';
import { ListEventsQuery, useCreateEventMutation } from 'src/generated-types';
import { LIST_EVENTS } from 'src/gql/event.gql';
import { parseISO } from 'date-fns';

interface EventsTableProps {
    events: ListEventsQuery['listEvents'];
}

const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
    console.log(events);

    const history = useHistory();

    const theme = useTheme();

    const tableData = events.map(event => [event.name, event.modifiedAt.toString()]);

    const [createEvent] = useCreateEventMutation({
        refetchQueries: [
            {
                query: LIST_EVENTS,
            },
        ],
        awaitRefetchQueries: true,
    });

    const columns = [
        {
            name: 'event',
            label: 'Event',
            options: {},
        },
        {
            name: 'date',
            label: 'Date',
            options: {},
        },
    ];

    return (
        <>
            <Grid container direction='column'>
                <Grid item>
                    <MUIDataTable
                        title='Events'
                        data={tableData}
                        columns={columns}
                        options={{
                            onRowClick: rowData => {
                                console.log(`clicked`, rowData);
                            },
                        }}
                    />
                </Grid>
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
                {/* {props.auth.isAuthenticated && (
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
                )} */}
            </Grid>
        </>
    );
};

export default EventsTable;

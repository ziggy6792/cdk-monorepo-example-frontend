/* eslint-disable no-underscore-dangle */
import { Grid } from '@material-ui/core';
import React from 'react';
import { useListEventsQuery } from 'src/generated-types';
import CreateEvent from './create-event';
// import { useListEventsQuery } from 'src/gql/custom-hooks/use-list-events';
// import { listEvents } from 'src/gql/types/listEvents';
import EventsTable from './events-table';

const EventsScreen: React.FC = () => {
    const { loading, data, error } = useListEventsQuery();

    return (
        <>
            {loading && <div>loading</div>}
            {!loading && (
                <Grid container direction='column'>
                    <Grid item>
                        <EventsTable events={data.listEvents} />
                    </Grid>
                    <Grid item>
                        <CreateEvent />
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default EventsScreen;

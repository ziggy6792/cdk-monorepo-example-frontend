/* eslint-disable no-underscore-dangle */
import { Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import authSelectors from 'src/domain/auth/selectors';
import { useListEventsQuery } from 'src/generated-types';
import CreateEvent from './create-event';
// import { useListEventsQuery } from 'src/gql/custom-hooks/use-list-events';
// import { listEvents } from 'src/gql/types/listEvents';
import EventsTable from './events-table';

const EventsScreen: React.FC = () => {
    const { loading, data, error } = useListEventsQuery();
    const isAuthenticated = useSelector(authSelectors.selectIsAuthenticated);

    return (
        <>
            {loading && <div>loading</div>}
            {!loading && (
                <Grid container direction='column'>
                    <Grid item>
                        <EventsTable events={data.listEvents} />
                    </Grid>
                    {isAuthenticated && (
                        <Grid item>
                            <CreateEvent />
                        </Grid>
                    )}
                </Grid>
            )}
        </>
    );
};

export default EventsScreen;

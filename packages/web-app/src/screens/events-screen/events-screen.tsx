/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useListEventsQuery } from 'src/generated-types';
// import { useListEventsQuery } from 'src/gql/custom-hooks/use-list-events';
// import { listEvents } from 'src/gql/types/listEvents';
import EventsTable from './events-table';

const EventsScreen: React.FC = () => {
    // const { loading, events, error } = useListEvents();

    const { loading, data, error } = useListEventsQuery();

    return (
        <>
            {loading && <div>loading</div>}
            {!loading && <EventsTable events={data.listEvents} />}
        </>
    );
};

export default EventsScreen;

/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useQuery } from 'react-apollo';
import Event from 'src/domain/models/event';
import { LIST_EVENTS } from 'src/graphql/custom-queries';
import EventsTable from './events-table';

const EventsScreen: React.FC = () => {
    const { loading, data, error } = useQuery<{ listEvents: Event[] }>(LIST_EVENTS);

    return (
        <>
            {loading && <div>loading</div>}
            {!loading && <EventsTable events={data.listEvents} />}
        </>
    );
};

export default EventsScreen;

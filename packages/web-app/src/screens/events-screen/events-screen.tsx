/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useQuery } from 'react-apollo';
import Event from 'src/domain/models/event';
import { LIST_EVENTS } from 'src/gql/event.gql';
import { useListEvents } from 'src/gql/hooks/use-list-events';
import { listEvents } from 'src/gql/types/listEvents';
import EventsTable from './events-table';

const EventsScreen: React.FC = () => {
    const { loading, events, error } = useListEvents();

    return (
        <>
            {loading && <div>loading</div>}
            {!loading && <EventsTable events={events} />}
        </>
    );
};

export default EventsScreen;

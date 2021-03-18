/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useQuery } from 'react-apollo';
import Event from 'src/domain/models/event';
import { LIST_EVENTS } from 'src/graphql/custom-queries';

interface EventsTableProps {
    events: Event[];
}

const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
    console.log(events);
    return (
        <>
            <div>{JSON.stringify(events)}</div>
        </>
    );
};

export default EventsTable;

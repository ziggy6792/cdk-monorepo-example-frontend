/* eslint-disable import/prefer-default-export */

import { QueryResult, useQuery } from 'react-apollo';
import { listEvents, listEvents_listEvents } from 'src/gql/types/listEvents';
import { LIST_EVENTS } from 'src/gql/event.gql';
import { parseISO } from 'date-fns';

export interface ListEvent extends Omit<listEvents_listEvents, 'startTime'> {
    startTime: Date;
}

interface ListEventsResult extends Omit<QueryResult, 'data'> {
    events: ListEvent[];
}

export const useListEvents = (): ListEventsResult => {
    const { data, ...rest } = useQuery<listEvents>(LIST_EVENTS);
    return { ...rest, events: data?.listEvents.map((event) => ({ ...event, startTime: parseISO(event.startTime) })) };
};

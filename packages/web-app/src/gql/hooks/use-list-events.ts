/* eslint-disable import/prefer-default-export */

import { QueryResult, useQuery } from 'react-apollo';
import { listEvents, listEvents_listEvents } from 'src/gql/types/listEvents';
import { LIST_EVENTS } from 'src/gql/event.gql';

interface ListEventsResult extends Omit<QueryResult, 'data'> {
    events: listEvents_listEvents[];
}

export const useListEvents = (): ListEventsResult => {
    const { data, ...rest } = useQuery<listEvents>(LIST_EVENTS);
    return { ...rest, events: data.listEvents };
};

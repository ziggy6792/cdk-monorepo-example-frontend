/* eslint-disable import/prefer-default-export */

import { QueryResult } from 'react-apollo';
import { parseISO } from 'date-fns';
import { ListEventsQuery, useListEventsQuery as generatedUseListEventsQuery } from 'src/generated-types';

export interface ListEvent extends Omit<ListEventsQuery['listEvents'][number], 'startTime'> {
    startTime: Date;
}

interface ListEventsResult extends Omit<QueryResult, 'data'> {
    data: { listEvents: ListEvent[] };
}

export const useListEventsQuery = (): ListEventsResult => {
    const { data, ...rest } = generatedUseListEventsQuery();
    return { ...rest, data: { listEvents: data?.listEvents.map((event) => ({ ...event, startTime: parseISO(event.startTime) })) || [] } };
};

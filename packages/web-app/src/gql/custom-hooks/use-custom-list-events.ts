/* eslint-disable import/prefer-default-export */

import { QueryResult } from '@apollo/client';
import { ListEventsQuery, useListEventsQuery } from 'src/generated-types';

export interface ListEvent extends Omit<ListEventsQuery['listEvents'][number], 'startTime'> {
    startTime: string;
}

interface ListEventsResult extends QueryResult {
    data: { listEvents: ListEvent[] };
}

export const useCustomListEventsQuery = (): ListEventsResult => {
    const { data, ...rest } = useListEventsQuery();
    return { ...rest, data: { listEvents: data?.listEvents.map(event => ({ ...event, startTime: 'massaged startTime' })) || [] } };
};

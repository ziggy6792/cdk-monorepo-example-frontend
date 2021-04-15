/* eslint-disable import/prefer-default-export */

import { QueryResult } from '@apollo/client';
import { ListEventsQuery, useListEventsQuery } from 'src/generated-types';

export interface IListEvent extends Omit<ListEventsQuery['listEvents'][number], 'startTime'> {
  startTime: string;
}

interface IListEventsResult extends QueryResult {
  data: { listEvents: IListEvent[] };
}

export const useCustomListEventsQuery = (): IListEventsResult => {
  const { data, ...rest } = useListEventsQuery();
  return { ...rest, data: { listEvents: data?.listEvents.map((event) => ({ ...event, startTime: 'massaged startTime' })) || [] } };
};

/* eslint-disable import/prefer-default-export */

import { QueryResult } from '@apollo/client';
import { useGetSelectedHeatQuery, GetSelectedHeatQuery, GetSelectedHeatQueryVariables, BreadcrumbFieldsFragment } from 'src/generated-types';
import * as ApolloReactHooks from '@apollo/react-hooks';

export interface IGetSelectedHeatResult extends QueryResult {
  data: { selectedHeat: GetSelectedHeatQuery['getEvent']['selectedHeat'] } & { eventName: string };
}

export const useCustomGetSelectedHeatQuery = (
  baseOptions: ApolloReactHooks.QueryHookOptions<GetSelectedHeatQuery, GetSelectedHeatQueryVariables>
): IGetSelectedHeatResult => {
  const { data, ...rest } = useGetSelectedHeatQuery(baseOptions);
  return {
    ...rest,
    data: data ? { selectedHeat: data?.getEvent?.selectedHeat, eventName: data?.getEvent?.name } : null,
  };
};

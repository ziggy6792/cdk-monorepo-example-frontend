/* eslint-disable import/prefer-default-export */

import { QueryResult } from '@apollo/client';
import { useGetSelectedHeatQuery, GetSelectedHeatQuery, GetSelectedHeatQueryVariables } from 'src/generated-types';
import * as ApolloReactHooks from '@apollo/react-hooks';

export interface IGetSelectedHeatResult extends QueryResult {
  data: { selectedHeat: GetSelectedHeatQuery['getEvent']['selectedHeat'] };
}

export const useCustomGetSelectedHeatQuery = (
  baseOptions: ApolloReactHooks.QueryHookOptions<GetSelectedHeatQuery, GetSelectedHeatQueryVariables>
): IGetSelectedHeatResult => {
  const { data, ...rest } = useGetSelectedHeatQuery(baseOptions);
  return { ...rest, data: { selectedHeat: data?.getEvent?.selectedHeat } };
};

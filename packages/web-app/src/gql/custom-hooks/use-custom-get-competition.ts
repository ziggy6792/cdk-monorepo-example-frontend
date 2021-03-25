// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// /* eslint-disable import/prefer-default-export */

// import { QueryResult } from '@apollo/client';
// import { GetCompetitionQuery, GetCompetitionQueryVariables, ListEventsQuery, useGetCompetitionQuery } from 'src/generated-types';
// import * as ApolloReactHooks from '@apollo/react-hooks';

// export interface ListEvent extends Omit<ListEventsQuery['listEvents'][number], 'startTime'> {
//     startTime: string;
// }

// interface ListEventsResult extends QueryResult {
//     data: { listEvents: ListEvent[] };
// }

// export const useCustomGetCompetitionQuery = (baseOptions?: ApolloReactHooks.QueryHookOptions<GetCompetitionQuery, GetCompetitionQueryVariables>) => {
//     const { data, ...rest } = useGetCompetitionQuery(baseOptions);
//     return {
//         ...rest,
//         data: {
//             getCompetition: {
//                 rounds: { items: data?.getCompetition.rounds.items.map((round) => ({ heats: { items: round.heats.items.map((heat) => ({ ...heat })) } })) },
//             },
//         },
//     };
// };

export default {};

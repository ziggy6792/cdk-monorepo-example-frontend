import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: Date,
};


export type Competition = DataEntity & Identifiable & Creatable & {
   __typename?: 'Competition',
  createdAt: Scalars['String'],
  modifiedAt: Scalars['String'],
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  description: Scalars['String'],
  category: Scalars['String'],
  eventId: Scalars['ID'],
  judgeUserId: Scalars['ID'],
  startTime: Scalars['String'],
  status: CompetitionStatus,
  params: CompetitionParams,
  maxRiders: Scalars['Int'],
  gender: Gender,
  sport: Sport,
  level: Level,
  judgeUser: User,
  event: Event,
  rounds: RoundList,
  riderAllocations: RiderAllocationList,
};

export type CompetitionList = {
   __typename?: 'CompetitionList',
  items: Array<Competition>,
};

export type CompetitionParams = {
   __typename?: 'CompetitionParams',
  name: Scalars['String'],
};

export type CompetitionParamsInput = {
  rounds: Array<RoundParamsInput>,
};

/** The Competition Status */
export enum CompetitionStatus {
  RegistrationOpen = 'REGISTRATION_OPEN',
  RegistrationClosed = 'REGISTRATION_CLOSED',
  Finalized = 'FINALIZED'
}

export type Creatable = {
  createdAt: Scalars['String'],
  modifiedAt: Scalars['String'],
};

export type CreateCompetitionInput = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
  judgeUserId?: Maybe<Scalars['ID']>,
  startTime?: Maybe<Scalars['String']>,
  status?: Maybe<CompetitionStatus>,
  selectedHeatId?: Maybe<Scalars['String']>,
  maxRiders?: Maybe<Scalars['Int']>,
  gender?: Maybe<Gender>,
  sport?: Maybe<Sport>,
  level?: Maybe<Level>,
  id?: Maybe<Scalars['ID']>,
  eventId: Scalars['ID'],
};

export type CreateEventInput = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  status?: Maybe<EventStatus>,
  adminUserId?: Maybe<Scalars['String']>,
  selectedHeatId?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  startTime: Scalars['DateTime'],
};

export type CreateRiderAllocationInput = {
  allocatableId: Scalars['ID'],
  userId?: Maybe<Scalars['ID']>,
  startSeed: Scalars['Int'],
};

export type CreateUserInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  id?: Maybe<Scalars['ID']>,
};

export type DataEntity = {
  createdAt: Scalars['String'],
  modifiedAt: Scalars['String'],
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
};


export type Event = DataEntity & Identifiable & Creatable & {
   __typename?: 'Event',
  createdAt: Scalars['String'],
  modifiedAt: Scalars['String'],
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  description: Scalars['String'],
  startTime: Scalars['DateTime'],
  startTime2?: Maybe<Scalars['DateTime']>,
  status: EventStatus,
  adminUserId: Scalars['String'],
  selectedHeatId: Scalars['String'],
  adminUser: User,
  selectedHeat: Heat,
  competitions: CompetitionList,
};

/** The Event Status */
export enum EventStatus {
  RegistrationOpen = 'REGISTRATION_OPEN',
  RegistrationClosed = 'REGISTRATION_CLOSED',
  Finalized = 'FINALIZED'
}

/** Gender */
export enum Gender {
  Any = 'ANY',
  Male = 'MALE',
  Female = 'FEMALE'
}

export type Heat = DataEntity & Identifiable & Creatable & {
   __typename?: 'Heat',
  createdAt: Scalars['String'],
  modifiedAt: Scalars['String'],
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  startTime: Scalars['String'],
  roundId: Scalars['ID'],
  status: HeatStatus,
  progressionsPerHeat: Scalars['Int'],
  round: Round,
  seedSlots: Array<SeedSlot>,
  getSortedRiderAllocations: RiderAllocationList,
  riderAllocations: RiderAllocationList,
};

export type HeatList = {
   __typename?: 'HeatList',
  items: Array<Heat>,
};

export type HeatParamsInput = {
  name: Scalars['String'],
  status?: Maybe<HeatStatus>,
  seedSlots: Array<SeedSlotParamsInput>,
};

/** The Heat Status */
export enum HeatStatus {
  Open = 'OPEN',
  Closed = 'CLOSED',
  Finished = 'FINISHED'
}

export type Identifiable = {
  createdAt: Scalars['String'],
  modifiedAt: Scalars['String'],
  id?: Maybe<Scalars['ID']>,
};

/** Level */
export enum Level {
  Any = 'ANY',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE',
  Advanced = 'ADVANCED',
  Professional = 'PROFESSIONAL'
}

export type Mutation = {
   __typename?: 'Mutation',
  createUser: User,
  updateUser: User,
  deleteUser: User,
  createEvent: Event,
  updateEvent: Event,
  deleteEvent: Event,
  createCompetition: Competition,
  updateCompetition: Competition,
  deleteCompetition: Competition,
  createRiderAllocation: RiderAllocation,
  createRiderAllocations: Array<RiderAllocation>,
  updateRiderAllocations: Array<RiderAllocation>,
  buildCompetition?: Maybe<Competition>,
  selectHeat: Event,
  allocateRiders?: Maybe<Competition>,
  scoreRun: Heat,
  endHeat: Competition,
};


export type MutationCreateUserArgs = {
  input: CreateUserInput
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']
};


export type MutationCreateEventArgs = {
  input: CreateEventInput
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInput
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']
};


export type MutationCreateCompetitionArgs = {
  input: CreateCompetitionInput
};


export type MutationUpdateCompetitionArgs = {
  input: UpdateCompetitionInput
};


export type MutationDeleteCompetitionArgs = {
  id: Scalars['ID']
};


export type MutationCreateRiderAllocationArgs = {
  input: CreateRiderAllocationInput
};


export type MutationCreateRiderAllocationsArgs = {
  input: Array<CreateRiderAllocationInput>
};


export type MutationUpdateRiderAllocationsArgs = {
  input: Array<UpdateRiderAllocationInput>
};


export type MutationBuildCompetitionArgs = {
  params: CompetitionParamsInput,
  id: Scalars['ID']
};


export type MutationSelectHeatArgs = {
  id: Scalars['ID']
};


export type MutationAllocateRidersArgs = {
  id: Scalars['ID']
};


export type MutationScoreRunArgs = {
  input: ScorRunInput
};


export type MutationEndHeatArgs = {
  id: Scalars['ID']
};

export type Query = {
   __typename?: 'Query',
  getMe?: Maybe<User>,
  getUser: User,
  listUsers: Array<User>,
  getEvent: Event,
  listEvents: Array<Event>,
  getCompetition: Competition,
  listCompetitions: Array<Competition>,
  getHeat: Heat,
  listHeats: Array<Heat>,
  getRound: Round,
  listRounds: Array<Round>,
  getDataEntity?: Maybe<DataEntity>,
  hello: Scalars['String'],
};


export type QueryGetUserArgs = {
  id: Scalars['ID']
};


export type QueryListUsersArgs = {
  limit?: Maybe<Scalars['Int']>
};


export type QueryGetEventArgs = {
  id: Scalars['ID']
};


export type QueryListEventsArgs = {
  limit?: Maybe<Scalars['Int']>
};


export type QueryGetCompetitionArgs = {
  id: Scalars['ID']
};


export type QueryListCompetitionsArgs = {
  limit?: Maybe<Scalars['Int']>
};


export type QueryGetHeatArgs = {
  id: Scalars['ID']
};


export type QueryListHeatsArgs = {
  limit?: Maybe<Scalars['Int']>
};


export type QueryGetRoundArgs = {
  id: Scalars['ID']
};


export type QueryListRoundsArgs = {
  limit?: Maybe<Scalars['Int']>
};


export type QueryGetDataEntityArgs = {
  id: Scalars['ID']
};

export type RiderAllocation = Creatable & {
   __typename?: 'RiderAllocation',
  createdAt: Scalars['String'],
  modifiedAt: Scalars['String'],
  allocatableId: Scalars['ID'],
  userId: Scalars['ID'],
  startSeed: Scalars['Int'],
  runs?: Maybe<Array<Run>>,
  position?: Maybe<Scalars['Int']>,
  user: User,
};

export type RiderAllocationList = {
   __typename?: 'RiderAllocationList',
  items: Array<RiderAllocation>,
};

export type Round = Identifiable & Creatable & {
   __typename?: 'Round',
  createdAt: Scalars['String'],
  modifiedAt: Scalars['String'],
  id?: Maybe<Scalars['ID']>,
  roundNo: Scalars['Int'],
  type: RoundType,
  competitionId: Scalars['ID'],
  startTime: Scalars['String'],
  getHeats: HeatList,
  heats: HeatList,
  competition: Competition,
};

export type RoundList = {
   __typename?: 'RoundList',
  items: Array<Round>,
};

export type RoundParamsInput = {
  roundNo: Scalars['Int'],
  type: RoundType,
  heats: Array<HeatParamsInput>,
};

/** The Round Type */
export enum RoundType {
  Upper = 'UPPER',
  Lower = 'LOWER'
}

export type Run = {
   __typename?: 'Run',
  score?: Maybe<Scalars['Float']>,
  isPublic?: Maybe<Scalars['Boolean']>,
};

export type RunInput = {
  score?: Maybe<Scalars['Float']>,
  isPublic?: Maybe<Scalars['Boolean']>,
};

export type ScorRunInput = {
  heatId: Scalars['ID'],
  userId: Scalars['ID'],
  runs: Array<RunInput>,
};

export type SeedSlot = {
   __typename?: 'SeedSlot',
  seed: Scalars['Int'],
  nextHeatId?: Maybe<Scalars['ID']>,
  nextHeat?: Maybe<Heat>,
};

export type SeedSlotParamsInput = {
  seed: Scalars['Int'],
};

/** Sport */
export enum Sport {
  Wakeboard = 'WAKEBOARD',
  Wakeskate = 'WAKESKATE'
}

export type UpdateCompetitionInput = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
  judgeUserId?: Maybe<Scalars['ID']>,
  startTime?: Maybe<Scalars['String']>,
  status?: Maybe<CompetitionStatus>,
  selectedHeatId?: Maybe<Scalars['String']>,
  maxRiders?: Maybe<Scalars['Int']>,
  gender?: Maybe<Gender>,
  sport?: Maybe<Sport>,
  level?: Maybe<Level>,
  id: Scalars['ID'],
};

export type UpdateEventInput = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  status?: Maybe<EventStatus>,
  adminUserId?: Maybe<Scalars['String']>,
  selectedHeatId?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  startTime?: Maybe<Scalars['DateTime']>,
};

export type UpdateRiderAllocationInput = {
  allocatableId: Scalars['ID'],
  userId?: Maybe<Scalars['ID']>,
  startSeed: Scalars['Int'],
};

export type UpdateUserInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  id: Scalars['ID'],
};

export type User = Identifiable & Creatable & {
   __typename?: 'User',
  createdAt: Scalars['String'],
  modifiedAt: Scalars['String'],
  id?: Maybe<Scalars['ID']>,
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  fullName: Scalars['String'],
};

export type GetCompetitionQueryVariables = {
  competitionId: Scalars['ID']
};


export type GetCompetitionQuery = (
  { __typename?: 'Query' }
  & { getCompetition: (
    { __typename?: 'Competition' }
    & { rounds: (
      { __typename?: 'RoundList' }
      & { items: Array<(
        { __typename?: 'Round' }
        & { heats: (
          { __typename?: 'HeatList' }
          & { items: Array<(
            { __typename?: 'Heat' }
            & Pick<Heat, 'name'>
            & { riderAllocations: (
              { __typename?: 'RiderAllocationList' }
              & { items: Array<(
                { __typename?: 'RiderAllocation' }
                & Pick<RiderAllocation, 'userId' | 'position' | 'startSeed'>
                & { runs: Maybe<Array<(
                  { __typename?: 'Run' }
                  & Pick<Run, 'score'>
                )>> }
              )> }
            ) }
          )> }
        ) }
      )> }
    ) }
  ) }
);

export type ListEventsQueryVariables = {};


export type ListEventsQuery = (
  { __typename?: 'Query' }
  & { listEvents: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'name' | 'startTime' | 'status'>
  )> }
);

export type GetDataEntityQueryVariables = {
  id: Scalars['ID']
};


export type GetDataEntityQuery = (
  { __typename?: 'Query' }
  & { getDataEntity: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'createdAt' | 'id' | 'name'>
  ) | (
    { __typename?: 'Heat' }
    & Pick<Heat, 'status' | 'createdAt' | 'id' | 'name'>
  ) | (
    { __typename?: 'Competition' }
    & Pick<Competition, 'judgeUserId' | 'createdAt' | 'id' | 'name'>
  )> }
);


export const GetCompetitionDocument = gql`
    query getCompetition($competitionId: ID!) {
  getCompetition(id: $competitionId) {
    rounds {
      items {
        heats {
          items {
            name
            riderAllocations {
              items {
                userId
                position
                startSeed
                runs {
                  score
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetCompetitionQuery__
 *
 * To run a query within a React component, call `useGetCompetitionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompetitionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompetitionQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useGetCompetitionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCompetitionQuery, GetCompetitionQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCompetitionQuery, GetCompetitionQueryVariables>(GetCompetitionDocument, baseOptions);
      }
export function useGetCompetitionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCompetitionQuery, GetCompetitionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCompetitionQuery, GetCompetitionQueryVariables>(GetCompetitionDocument, baseOptions);
        }
export type GetCompetitionQueryHookResult = ReturnType<typeof useGetCompetitionQuery>;
export type GetCompetitionLazyQueryHookResult = ReturnType<typeof useGetCompetitionLazyQuery>;
export type GetCompetitionQueryResult = ApolloReactCommon.QueryResult<GetCompetitionQuery, GetCompetitionQueryVariables>;
export const ListEventsDocument = gql`
    query listEvents {
  listEvents {
    id
    name
    startTime
    status
  }
}
    `;

/**
 * __useListEventsQuery__
 *
 * To run a query within a React component, call `useListEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListEventsQuery, ListEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<ListEventsQuery, ListEventsQueryVariables>(ListEventsDocument, baseOptions);
      }
export function useListEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListEventsQuery, ListEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListEventsQuery, ListEventsQueryVariables>(ListEventsDocument, baseOptions);
        }
export type ListEventsQueryHookResult = ReturnType<typeof useListEventsQuery>;
export type ListEventsLazyQueryHookResult = ReturnType<typeof useListEventsLazyQuery>;
export type ListEventsQueryResult = ApolloReactCommon.QueryResult<ListEventsQuery, ListEventsQueryVariables>;
export const GetDataEntityDocument = gql`
    query getDataEntity($id: ID!) {
  getDataEntity(id: $id) {
    createdAt
    id
    name
    ... on Competition {
      judgeUserId
    }
    ... on Heat {
      status
    }
  }
}
    `;

/**
 * __useGetDataEntityQuery__
 *
 * To run a query within a React component, call `useGetDataEntityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataEntityQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataEntityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDataEntityQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDataEntityQuery, GetDataEntityQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDataEntityQuery, GetDataEntityQueryVariables>(GetDataEntityDocument, baseOptions);
      }
export function useGetDataEntityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDataEntityQuery, GetDataEntityQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDataEntityQuery, GetDataEntityQueryVariables>(GetDataEntityDocument, baseOptions);
        }
export type GetDataEntityQueryHookResult = ReturnType<typeof useGetDataEntityQuery>;
export type GetDataEntityLazyQueryHookResult = ReturnType<typeof useGetDataEntityLazyQuery>;
export type GetDataEntityQueryResult = ApolloReactCommon.QueryResult<GetDataEntityQuery, GetDataEntityQueryVariables>;
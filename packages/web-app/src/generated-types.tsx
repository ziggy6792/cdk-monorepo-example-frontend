import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: Date;
};

export type Competition = DataEntity &
    Identifiable &
    Creatable & {
        __typename?: 'Competition';
        createdAt: Scalars['DateTime'];
        modifiedAt: Scalars['DateTime'];
        id: Scalars['ID'];
        name: Scalars['String'];
        description: Scalars['String'];
        category: Scalars['String'];
        eventId: Scalars['ID'];
        judgeUserId: Scalars['ID'];
        startTime: Scalars['DateTime'];
        status: CompetitionStatus;
        params: CompetitionParams;
        maxRiders?: Maybe<Scalars['Int']>;
        gender: Gender;
        sport: Sport;
        level: Level;
        judgeUser?: Maybe<User>;
        event: Event;
        rounds: RoundList;
        riderAllocations: RiderAllocationList;
    };

export type CompetitionList = {
    __typename?: 'CompetitionList';
    items: Array<Competition>;
};

export type CompetitionParams = {
    __typename?: 'CompetitionParams';
    name: Scalars['String'];
};

export type CompetitionParamsInput = {
    rounds: Array<RoundParamsInput>;
};

/** The Competition Status */
export enum CompetitionStatus {
    RegistrationOpen = 'REGISTRATION_OPEN',
    RegistrationClosed = 'REGISTRATION_CLOSED',
    Finalized = 'FINALIZED',
}

export type Creatable = {
    createdAt: Scalars['DateTime'];
    modifiedAt: Scalars['DateTime'];
};

export type CreateCompetitionInput = {
    name: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    category?: Maybe<Scalars['String']>;
    judgeUserId?: Maybe<Scalars['ID']>;
    startTime?: Maybe<Scalars['DateTime']>;
    status?: Maybe<CompetitionStatus>;
    selectedHeatId?: Maybe<Scalars['String']>;
    maxRiders?: Maybe<Scalars['Int']>;
    gender?: Maybe<Gender>;
    sport?: Maybe<Sport>;
    level?: Maybe<Level>;
    id?: Maybe<Scalars['ID']>;
    eventId: Scalars['ID'];
};

export type CreateEventInput = {
    name: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    status?: Maybe<EventStatus>;
    adminUserId?: Maybe<Scalars['String']>;
    selectedHeatId?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['ID']>;
    startTime: Scalars['DateTime'];
};

export type CreateRiderAllocationInput = {
    allocatableId: Scalars['ID'];
    userId?: Maybe<Scalars['ID']>;
    startSeed: Scalars['Int'];
};

export type CreateUserInput = {
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    email: Scalars['String'];
    id?: Maybe<Scalars['ID']>;
};

export type DataEntity = {
    createdAt: Scalars['DateTime'];
    modifiedAt: Scalars['DateTime'];
    id: Scalars['ID'];
    name: Scalars['String'];
};

export type Event = DataEntity &
    Identifiable &
    Creatable &
    Schedulable & {
        __typename?: 'Event';
        createdAt: Scalars['DateTime'];
        modifiedAt: Scalars['DateTime'];
        id: Scalars['ID'];
        name: Scalars['String'];
        startTime: Scalars['DateTime'];
        description?: Maybe<Scalars['String']>;
        status: EventStatus;
        adminUserId: Scalars['String'];
        selectedHeatId: Scalars['String'];
        adminUser: User;
        selectedHeat?: Maybe<Heat>;
        competitions: CompetitionList;
    };

/** The Event Status */
export enum EventStatus {
    RegistrationOpen = 'REGISTRATION_OPEN',
    RegistrationClosed = 'REGISTRATION_CLOSED',
    Finalized = 'FINALIZED',
}

/** Gender */
export enum Gender {
    Any = 'ANY',
    Male = 'MALE',
    Female = 'FEMALE',
}

export type Heat = DataEntity &
    Identifiable &
    Creatable &
    Schedulable & {
        __typename?: 'Heat';
        createdAt: Scalars['DateTime'];
        modifiedAt: Scalars['DateTime'];
        id: Scalars['ID'];
        name: Scalars['String'];
        startTime: Scalars['DateTime'];
        roundId: Scalars['ID'];
        status: HeatStatus;
        progressionsPerHeat: Scalars['Int'];
        round: Round;
        seedSlots: Array<SeedSlot>;
        size: Scalars['Int'];
        getSortedRiderAllocations: RiderAllocationList;
        riderAllocations: RiderAllocationList;
        noAllocated: Scalars['Int'];
    };

export type HeatList = {
    __typename?: 'HeatList';
    items: Array<Heat>;
};

export type HeatParamsInput = {
    name: Scalars['String'];
    status?: Maybe<HeatStatus>;
    seedSlots: Array<SeedSlotParamsInput>;
};

/** The Heat Status */
export enum HeatStatus {
    Open = 'OPEN',
    Closed = 'CLOSED',
    Finished = 'FINISHED',
}

export type Identifiable = {
    createdAt: Scalars['DateTime'];
    modifiedAt: Scalars['DateTime'];
    id: Scalars['ID'];
};

/** Level */
export enum Level {
    Any = 'ANY',
    Beginner = 'BEGINNER',
    Intermediate = 'INTERMEDIATE',
    Advanced = 'ADVANCED',
    Professional = 'PROFESSIONAL',
}

export type Mutation = {
    __typename?: 'Mutation';
    createUser: User;
    updateUser: User;
    deleteUser: User;
    createEvent: Event;
    updateEvent: Event;
    deleteEvent: Event;
    createCompetition: Competition;
    updateCompetition: Competition;
    deleteCompetition: Competition;
    createRiderAllocation: RiderAllocation;
    createRiderAllocations: Array<RiderAllocation>;
    updateRiderAllocations: Array<RiderAllocation>;
    buildCompetition?: Maybe<Competition>;
    selectHeat: Event;
    allocateRiders?: Maybe<Competition>;
    scoreRun: Heat;
    endHeat: Competition;
};

export type MutationCreateUserArgs = {
    input: CreateUserInput;
};

export type MutationUpdateUserArgs = {
    input: UpdateUserInput;
};

export type MutationDeleteUserArgs = {
    id: Scalars['ID'];
};

export type MutationCreateEventArgs = {
    input: CreateEventInput;
};

export type MutationUpdateEventArgs = {
    input: UpdateEventInput;
};

export type MutationDeleteEventArgs = {
    id: Scalars['ID'];
};

export type MutationCreateCompetitionArgs = {
    input: CreateCompetitionInput;
};

export type MutationUpdateCompetitionArgs = {
    input: UpdateCompetitionInput;
};

export type MutationDeleteCompetitionArgs = {
    id: Scalars['ID'];
};

export type MutationCreateRiderAllocationArgs = {
    input: CreateRiderAllocationInput;
};

export type MutationCreateRiderAllocationsArgs = {
    input: Array<CreateRiderAllocationInput>;
};

export type MutationUpdateRiderAllocationsArgs = {
    input: Array<UpdateRiderAllocationInput>;
};

export type MutationBuildCompetitionArgs = {
    params: CompetitionParamsInput;
    id: Scalars['ID'];
};

export type MutationSelectHeatArgs = {
    id: Scalars['ID'];
};

export type MutationAllocateRidersArgs = {
    id: Scalars['ID'];
};

export type MutationScoreRunArgs = {
    input: ScorRunInput;
};

export type MutationEndHeatArgs = {
    id: Scalars['ID'];
};

export type Query = {
    __typename?: 'Query';
    getMe?: Maybe<User>;
    getUser: User;
    listUsers: Array<User>;
    getEvent: Event;
    listEvents: Array<Event>;
    getCompetition: Competition;
    listCompetitions: Array<Competition>;
    getHeat: Heat;
    listHeats: Array<Heat>;
    getRound: Round;
    listRounds: Array<Round>;
    getDataEntity?: Maybe<DataEntity>;
    hello: Scalars['String'];
};

export type QueryGetUserArgs = {
    id: Scalars['ID'];
};

export type QueryListUsersArgs = {
    limit?: Maybe<Scalars['Int']>;
};

export type QueryGetEventArgs = {
    id: Scalars['ID'];
};

export type QueryListEventsArgs = {
    limit?: Maybe<Scalars['Int']>;
};

export type QueryGetCompetitionArgs = {
    id: Scalars['ID'];
};

export type QueryListCompetitionsArgs = {
    limit?: Maybe<Scalars['Int']>;
};

export type QueryGetHeatArgs = {
    id: Scalars['ID'];
};

export type QueryListHeatsArgs = {
    limit?: Maybe<Scalars['Int']>;
};

export type QueryGetRoundArgs = {
    id: Scalars['ID'];
};

export type QueryListRoundsArgs = {
    limit?: Maybe<Scalars['Int']>;
};

export type QueryGetDataEntityArgs = {
    id: Scalars['ID'];
};

export type RiderAllocation = Creatable & {
    __typename?: 'RiderAllocation';
    createdAt: Scalars['DateTime'];
    modifiedAt: Scalars['DateTime'];
    allocatableId: Scalars['ID'];
    userId: Scalars['ID'];
    startSeed: Scalars['Int'];
    runs?: Maybe<Array<Run>>;
    position?: Maybe<Scalars['Int']>;
    rankOrder?: Maybe<Scalars['Int']>;
    startOrder?: Maybe<Scalars['Int']>;
    user?: Maybe<User>;
};

export type RiderAllocationList = {
    __typename?: 'RiderAllocationList';
    items: Array<RiderAllocation>;
};

export type Round = Identifiable &
    Creatable &
    Schedulable & {
        __typename?: 'Round';
        createdAt: Scalars['DateTime'];
        modifiedAt: Scalars['DateTime'];
        id: Scalars['ID'];
        startTime: Scalars['DateTime'];
        roundNo: Scalars['Int'];
        type: RoundType;
        competitionId: Scalars['ID'];
        getHeats: HeatList;
        heats: HeatList;
        competition: Competition;
    };

export type RoundList = {
    __typename?: 'RoundList';
    items: Array<Round>;
};

export type RoundParamsInput = {
    roundNo: Scalars['Int'];
    type: RoundType;
    heats: Array<HeatParamsInput>;
};

/** The Round Type */
export enum RoundType {
    Upper = 'UPPER',
    Lower = 'LOWER',
}

export type Run = {
    __typename?: 'Run';
    score?: Maybe<Scalars['Float']>;
    isPublic?: Maybe<Scalars['Boolean']>;
};

export type RunInput = {
    score?: Maybe<Scalars['Float']>;
    isPublic?: Maybe<Scalars['Boolean']>;
};

export type Schedulable = {
    startTime: Scalars['DateTime'];
};

export type ScorRunInput = {
    heatId: Scalars['ID'];
    userId: Scalars['ID'];
    runs: Array<RunInput>;
};

export type SeedSlot = {
    __typename?: 'SeedSlot';
    seed: Scalars['Int'];
    nextHeatId?: Maybe<Scalars['ID']>;
    nextHeat?: Maybe<Heat>;
};

export type SeedSlotParamsInput = {
    seed: Scalars['Int'];
};

/** Sport */
export enum Sport {
    Wakeboard = 'WAKEBOARD',
    Wakeskate = 'WAKESKATE',
}

export type UpdateCompetitionInput = {
    name: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    category?: Maybe<Scalars['String']>;
    judgeUserId?: Maybe<Scalars['ID']>;
    startTime?: Maybe<Scalars['DateTime']>;
    status?: Maybe<CompetitionStatus>;
    selectedHeatId?: Maybe<Scalars['String']>;
    maxRiders?: Maybe<Scalars['Int']>;
    gender?: Maybe<Gender>;
    sport?: Maybe<Sport>;
    level?: Maybe<Level>;
    id: Scalars['ID'];
};

export type UpdateEventInput = {
    name: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    status?: Maybe<EventStatus>;
    adminUserId?: Maybe<Scalars['String']>;
    selectedHeatId?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    startTime?: Maybe<Scalars['DateTime']>;
};

export type UpdateRiderAllocationInput = {
    allocatableId: Scalars['ID'];
    userId?: Maybe<Scalars['ID']>;
    startSeed: Scalars['Int'];
};

export type UpdateUserInput = {
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    email: Scalars['String'];
    id: Scalars['ID'];
};

export type User = Identifiable &
    Creatable & {
        __typename?: 'User';
        createdAt: Scalars['DateTime'];
        modifiedAt: Scalars['DateTime'];
        id: Scalars['ID'];
        email: Scalars['String'];
        firstName: Scalars['String'];
        lastName: Scalars['String'];
        fullName: Scalars['String'];
    };

export type GetCompetitionQueryVariables = {
    id: Scalars['ID'];
};

export type GetCompetitionQuery = { __typename?: 'Query' } & {
    getCompetition: { __typename?: 'Competition' } & Pick<
        Competition,
        'id' | 'name' | 'description' | 'level' | 'gender' | 'sport' | 'maxRiders' | 'judgeUserId'
    > & {
            judgeUser: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'fullName'>>;
            riderAllocations: { __typename?: 'RiderAllocationList' } & {
                items: Array<
                    { __typename?: 'RiderAllocation' } & Pick<RiderAllocation, 'userId' | 'startSeed'> & {
                            user: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'fullName'>>;
                        }
                >;
            };
            rounds: { __typename?: 'RoundList' } & {
                items: Array<
                    { __typename?: 'Round' } & {
                        heats: { __typename?: 'HeatList' } & {
                            items: Array<
                                { __typename?: 'Heat' } & Pick<Heat, 'id' | 'name' | 'size' | 'noAllocated' | 'createdAt'> & {
                                        round: { __typename?: 'Round' } & Pick<Round, 'roundNo'>;
                                    }
                            >;
                        };
                    }
                >;
            };
        };
};

export type CreateCompetitionMutationVariables = {
    input: CreateCompetitionInput;
};

export type CreateCompetitionMutation = { __typename?: 'Mutation' } & { createCompetition: { __typename?: 'Competition' } & Pick<Competition, 'id'> };

export type UpdateCompetitionMutationVariables = {
    input: UpdateCompetitionInput;
};

export type UpdateCompetitionMutation = { __typename?: 'Mutation' } & { updateCompetition: { __typename?: 'Competition' } & Pick<Competition, 'id'> };

export type BuildCompetitionMutationVariables = {
    params: CompetitionParamsInput;
    id: Scalars['ID'];
};

export type BuildCompetitionMutation = { __typename?: 'Mutation' } & { buildCompetition: Maybe<{ __typename?: 'Competition' } & Pick<Competition, 'id'>> };

export type AllocateRidersMutationVariables = {
    id: Scalars['ID'];
};

export type AllocateRidersMutation = { __typename?: 'Mutation' } & {
    allocateRiders: Maybe<
        { __typename?: 'Competition' } & Pick<Competition, 'id'> & {
                rounds: { __typename?: 'RoundList' } & {
                    items: Array<
                        { __typename?: 'Round' } & Pick<Round, 'id'> & {
                                heats: { __typename?: 'HeatList' } & {
                                    items: Array<
                                        { __typename?: 'Heat' } & Pick<Heat, 'name'> & {
                                                riderAllocations: { __typename?: 'RiderAllocationList' } & {
                                                    items: Array<{ __typename?: 'RiderAllocation' } & Pick<RiderAllocation, 'userId' | 'startSeed'>>;
                                                };
                                            }
                                    >;
                                };
                            }
                    >;
                };
            }
    >;
};

export type ListEventsQueryVariables = {};

export type ListEventsQuery = { __typename?: 'Query' } & {
    listEvents: Array<{ __typename?: 'Event' } & Pick<Event, 'id' | 'name' | 'startTime' | 'status' | 'createdAt' | 'modifiedAt'>>;
};

export type CreateEventMutationVariables = {
    input: CreateEventInput;
};

export type CreateEventMutation = { __typename?: 'Mutation' } & { createEvent: { __typename?: 'Event' } & Pick<Event, 'id'> };

export type UpdateEventMutationVariables = {
    input: UpdateEventInput;
};

export type UpdateEventMutation = { __typename?: 'Mutation' } & { updateEvent: { __typename?: 'Event' } & Pick<Event, 'id'> };

export type GetEventQueryVariables = {
    id: Scalars['ID'];
};

export type GetEventQuery = { __typename?: 'Query' } & {
    getEvent: { __typename?: 'Event' } & Pick<Event, 'id' | 'name' | 'startTime' | 'description'> & {
            adminUser: { __typename?: 'User' } & Pick<User, 'fullName'>;
            competitions: { __typename?: 'CompetitionList' } & {
                items: Array<
                    { __typename?: 'Competition' } & Pick<Competition, 'id' | 'name'> & { judgeUser: Maybe<{ __typename?: 'User' } & Pick<User, 'fullName'>> }
                >;
            };
        };
};

export type GetSelectedHeatQueryVariables = {
    id: Scalars['ID'];
};

export type GetSelectedHeatQuery = { __typename?: 'Query' } & {
    getEvent: { __typename?: 'Event' } & Pick<Event, 'id'> & {
            selectedHeat: Maybe<
                { __typename?: 'Heat' } & Pick<Heat, 'id' | 'status' | 'name' | 'size' | 'noAllocated' | 'createdAt'> & {
                        round: { __typename?: 'Round' } & Pick<Round, 'roundNo'>;
                        riderAllocations: { __typename?: 'RiderAllocationList' } & {
                            items: Array<
                                { __typename?: 'RiderAllocation' } & Pick<
                                    RiderAllocation,
                                    'userId' | 'startSeed' | 'startOrder' | 'rankOrder' | 'allocatableId' | 'position'
                                > & {
                                        user: Maybe<{ __typename?: 'User' } & Pick<User, 'fullName'>>;
                                        runs: Maybe<Array<{ __typename?: 'Run' } & Pick<Run, 'score'>>>;
                                    }
                            >;
                        };
                    }
            >;
        };
};

export type ScoreRunMutationVariables = {
    input: ScorRunInput;
};

export type ScoreRunMutation = { __typename?: 'Mutation' } & { scoreRun: { __typename?: 'Heat' } & Pick<Heat, 'id'> };

export type GetDataEntityQueryVariables = {
    id: Scalars['ID'];
};

export type GetDataEntityQuery = { __typename?: 'Query' } & {
    getDataEntity: Maybe<
        | ({ __typename?: 'Event' } & Pick<Event, 'createdAt' | 'id' | 'name'>)
        | ({ __typename?: 'Heat' } & Pick<Heat, 'status' | 'createdAt' | 'id' | 'name'>)
        | ({ __typename?: 'Competition' } & Pick<Competition, 'judgeUserId' | 'createdAt' | 'id' | 'name'>)
    >;
};

export type UpdateRiderAllocationsMutationVariables = {
    input: Array<UpdateRiderAllocationInput>;
};

export type UpdateRiderAllocationsMutation = { __typename?: 'Mutation' } & {
    updateRiderAllocations: Array<{ __typename?: 'RiderAllocation' } & Pick<RiderAllocation, 'allocatableId'>>;
};

export type ListUsersQueryVariables = {};

export type ListUsersQuery = { __typename?: 'Query' } & { listUsers: Array<{ __typename?: 'User' } & Pick<User, 'id' | 'fullName'>> };

export const GetCompetitionDocument = gql`
    query getCompetition($id: ID!) {
        getCompetition(id: $id) {
            id
            name
            description
            level
            gender
            sport
            maxRiders
            judgeUserId
            judgeUser {
                id
                fullName
            }
            riderAllocations {
                items {
                    userId
                    user {
                        id
                        fullName
                    }
                    startSeed
                }
            }
            rounds {
                items {
                    heats {
                        items {
                            id
                            name
                            round {
                                roundNo
                            }
                            size
                            noAllocated
                            createdAt
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
 *      id: // value for 'id'
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
export const CreateCompetitionDocument = gql`
    mutation createCompetition($input: CreateCompetitionInput!) {
        createCompetition(input: $input) {
            id
        }
    }
`;
export type CreateCompetitionMutationFn = ApolloReactCommon.MutationFunction<CreateCompetitionMutation, CreateCompetitionMutationVariables>;

/**
 * __useCreateCompetitionMutation__
 *
 * To run a mutation, you first call `useCreateCompetitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompetitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompetitionMutation, { data, loading, error }] = useCreateCompetitionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompetitionMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCompetitionMutation, CreateCompetitionMutationVariables>
) {
    return ApolloReactHooks.useMutation<CreateCompetitionMutation, CreateCompetitionMutationVariables>(CreateCompetitionDocument, baseOptions);
}
export type CreateCompetitionMutationHookResult = ReturnType<typeof useCreateCompetitionMutation>;
export type CreateCompetitionMutationResult = ApolloReactCommon.MutationResult<CreateCompetitionMutation>;
export type CreateCompetitionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCompetitionMutation, CreateCompetitionMutationVariables>;
export const UpdateCompetitionDocument = gql`
    mutation updateCompetition($input: UpdateCompetitionInput!) {
        updateCompetition(input: $input) {
            id
        }
    }
`;
export type UpdateCompetitionMutationFn = ApolloReactCommon.MutationFunction<UpdateCompetitionMutation, UpdateCompetitionMutationVariables>;

/**
 * __useUpdateCompetitionMutation__
 *
 * To run a mutation, you first call `useUpdateCompetitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompetitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompetitionMutation, { data, loading, error }] = useUpdateCompetitionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCompetitionMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCompetitionMutation, UpdateCompetitionMutationVariables>
) {
    return ApolloReactHooks.useMutation<UpdateCompetitionMutation, UpdateCompetitionMutationVariables>(UpdateCompetitionDocument, baseOptions);
}
export type UpdateCompetitionMutationHookResult = ReturnType<typeof useUpdateCompetitionMutation>;
export type UpdateCompetitionMutationResult = ApolloReactCommon.MutationResult<UpdateCompetitionMutation>;
export type UpdateCompetitionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCompetitionMutation, UpdateCompetitionMutationVariables>;
export const BuildCompetitionDocument = gql`
    mutation buildCompetition($params: CompetitionParamsInput!, $id: ID!) {
        buildCompetition(id: $id, params: $params) {
            id
        }
    }
`;
export type BuildCompetitionMutationFn = ApolloReactCommon.MutationFunction<BuildCompetitionMutation, BuildCompetitionMutationVariables>;

/**
 * __useBuildCompetitionMutation__
 *
 * To run a mutation, you first call `useBuildCompetitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBuildCompetitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [buildCompetitionMutation, { data, loading, error }] = useBuildCompetitionMutation({
 *   variables: {
 *      params: // value for 'params'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBuildCompetitionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<BuildCompetitionMutation, BuildCompetitionMutationVariables>) {
    return ApolloReactHooks.useMutation<BuildCompetitionMutation, BuildCompetitionMutationVariables>(BuildCompetitionDocument, baseOptions);
}
export type BuildCompetitionMutationHookResult = ReturnType<typeof useBuildCompetitionMutation>;
export type BuildCompetitionMutationResult = ApolloReactCommon.MutationResult<BuildCompetitionMutation>;
export type BuildCompetitionMutationOptions = ApolloReactCommon.BaseMutationOptions<BuildCompetitionMutation, BuildCompetitionMutationVariables>;
export const AllocateRidersDocument = gql`
    mutation allocateRiders($id: ID!) {
        allocateRiders(id: $id) {
            id
            rounds {
                items {
                    id
                    heats {
                        items {
                            name
                            riderAllocations {
                                items {
                                    userId
                                    startSeed
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
export type AllocateRidersMutationFn = ApolloReactCommon.MutationFunction<AllocateRidersMutation, AllocateRidersMutationVariables>;

/**
 * __useAllocateRidersMutation__
 *
 * To run a mutation, you first call `useAllocateRidersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllocateRidersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allocateRidersMutation, { data, loading, error }] = useAllocateRidersMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAllocateRidersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AllocateRidersMutation, AllocateRidersMutationVariables>) {
    return ApolloReactHooks.useMutation<AllocateRidersMutation, AllocateRidersMutationVariables>(AllocateRidersDocument, baseOptions);
}
export type AllocateRidersMutationHookResult = ReturnType<typeof useAllocateRidersMutation>;
export type AllocateRidersMutationResult = ApolloReactCommon.MutationResult<AllocateRidersMutation>;
export type AllocateRidersMutationOptions = ApolloReactCommon.BaseMutationOptions<AllocateRidersMutation, AllocateRidersMutationVariables>;
export const ListEventsDocument = gql`
    query listEvents {
        listEvents {
            id
            name
            startTime
            status
            createdAt
            modifiedAt
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
export const CreateEventDocument = gql`
    mutation createEvent($input: CreateEventInput!) {
        createEvent(input: $input) {
            id
        }
    }
`;
export type CreateEventMutationFn = ApolloReactCommon.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
    return ApolloReactHooks.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, baseOptions);
}
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = ApolloReactCommon.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = gql`
    mutation updateEvent($input: UpdateEventInput!) {
        updateEvent(input: $input) {
            id
        }
    }
`;
export type UpdateEventMutationFn = ApolloReactCommon.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
    return ApolloReactHooks.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, baseOptions);
}
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = ApolloReactCommon.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const GetEventDocument = gql`
    query getEvent($id: ID!) {
        getEvent(id: $id) {
            id
            name
            adminUser {
                fullName
            }
            startTime
            description
            competitions {
                items {
                    id
                    name
                    judgeUser {
                        fullName
                    }
                }
            }
        }
    }
`;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
    return ApolloReactHooks.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, baseOptions);
}
export function useGetEventLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
    return ApolloReactHooks.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, baseOptions);
}
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventQueryResult = ApolloReactCommon.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const GetSelectedHeatDocument = gql`
    query getSelectedHeat($id: ID!) {
        getEvent(id: $id) {
            id
            selectedHeat {
                id
                status
                name
                round {
                    roundNo
                }
                size
                noAllocated
                createdAt
                riderAllocations {
                    items {
                        userId
                        user {
                            fullName
                        }
                        startSeed
                        startOrder
                        rankOrder
                        allocatableId
                        position
                        runs {
                            score
                        }
                    }
                }
            }
        }
    }
`;

/**
 * __useGetSelectedHeatQuery__
 *
 * To run a query within a React component, call `useGetSelectedHeatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSelectedHeatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSelectedHeatQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSelectedHeatQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSelectedHeatQuery, GetSelectedHeatQueryVariables>) {
    return ApolloReactHooks.useQuery<GetSelectedHeatQuery, GetSelectedHeatQueryVariables>(GetSelectedHeatDocument, baseOptions);
}
export function useGetSelectedHeatLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSelectedHeatQuery, GetSelectedHeatQueryVariables>) {
    return ApolloReactHooks.useLazyQuery<GetSelectedHeatQuery, GetSelectedHeatQueryVariables>(GetSelectedHeatDocument, baseOptions);
}
export type GetSelectedHeatQueryHookResult = ReturnType<typeof useGetSelectedHeatQuery>;
export type GetSelectedHeatLazyQueryHookResult = ReturnType<typeof useGetSelectedHeatLazyQuery>;
export type GetSelectedHeatQueryResult = ApolloReactCommon.QueryResult<GetSelectedHeatQuery, GetSelectedHeatQueryVariables>;
export const ScoreRunDocument = gql`
    mutation scoreRun($input: ScorRunInput!) {
        scoreRun(input: $input) {
            id
        }
    }
`;
export type ScoreRunMutationFn = ApolloReactCommon.MutationFunction<ScoreRunMutation, ScoreRunMutationVariables>;

/**
 * __useScoreRunMutation__
 *
 * To run a mutation, you first call `useScoreRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useScoreRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [scoreRunMutation, { data, loading, error }] = useScoreRunMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useScoreRunMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ScoreRunMutation, ScoreRunMutationVariables>) {
    return ApolloReactHooks.useMutation<ScoreRunMutation, ScoreRunMutationVariables>(ScoreRunDocument, baseOptions);
}
export type ScoreRunMutationHookResult = ReturnType<typeof useScoreRunMutation>;
export type ScoreRunMutationResult = ApolloReactCommon.MutationResult<ScoreRunMutation>;
export type ScoreRunMutationOptions = ApolloReactCommon.BaseMutationOptions<ScoreRunMutation, ScoreRunMutationVariables>;
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
export const UpdateRiderAllocationsDocument = gql`
    mutation updateRiderAllocations($input: [UpdateRiderAllocationInput!]!) {
        updateRiderAllocations(input: $input) {
            allocatableId
        }
    }
`;
export type UpdateRiderAllocationsMutationFn = ApolloReactCommon.MutationFunction<UpdateRiderAllocationsMutation, UpdateRiderAllocationsMutationVariables>;

/**
 * __useUpdateRiderAllocationsMutation__
 *
 * To run a mutation, you first call `useUpdateRiderAllocationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRiderAllocationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRiderAllocationsMutation, { data, loading, error }] = useUpdateRiderAllocationsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRiderAllocationsMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRiderAllocationsMutation, UpdateRiderAllocationsMutationVariables>
) {
    return ApolloReactHooks.useMutation<UpdateRiderAllocationsMutation, UpdateRiderAllocationsMutationVariables>(UpdateRiderAllocationsDocument, baseOptions);
}
export type UpdateRiderAllocationsMutationHookResult = ReturnType<typeof useUpdateRiderAllocationsMutation>;
export type UpdateRiderAllocationsMutationResult = ApolloReactCommon.MutationResult<UpdateRiderAllocationsMutation>;
export type UpdateRiderAllocationsMutationOptions = ApolloReactCommon.BaseMutationOptions<
    UpdateRiderAllocationsMutation,
    UpdateRiderAllocationsMutationVariables
>;
export const ListUsersDocument = gql`
    query listUsers {
        listUsers {
            id
            fullName
        }
    }
`;

/**
 * __useListUsersQuery__
 *
 * To run a query within a React component, call `useListUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
    return ApolloReactHooks.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions);
}
export function useListUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
    return ApolloReactHooks.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions);
}
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>;
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>;
export type ListUsersQueryResult = ApolloReactCommon.QueryResult<ListUsersQuery, ListUsersQueryVariables>;

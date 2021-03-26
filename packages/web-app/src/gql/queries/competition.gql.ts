import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */

export const GET_COMPETITION = gql`
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

export const CREATE_COMPETITION = gql`
    mutation createCompetition($input: CreateCompetitionInput!) {
        createCompetition(input: $input) {
            id
        }
    }
`;

export const UPDATE_COMPETITION = gql`
    mutation updateCompetition($input: UpdateCompetitionInput!) {
        updateCompetition(input: $input) {
            id
        }
    }
`;

export const BUILD_COMPETITION = gql`
    mutation buildCompetition($params: CompetitionParamsInput!, $id: ID!) {
        buildCompetition(id: $id, params: $params) {
            id
        }
    }
`;

export const ALLOCATE_RIDERS = gql`
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

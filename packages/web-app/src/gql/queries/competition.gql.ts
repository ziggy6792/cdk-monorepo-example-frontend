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

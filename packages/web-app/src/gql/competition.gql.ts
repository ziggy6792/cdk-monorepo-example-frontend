import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */

export const GET_COMPETITION = gql`
    query getCompetition($id: ID!) {
        getCompetition(id: $id) {
            riderAllocations {
                items {
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

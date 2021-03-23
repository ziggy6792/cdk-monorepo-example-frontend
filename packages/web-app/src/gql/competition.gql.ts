import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */

export const GET_COMPETITION = gql`
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

export const CREATE_COMPETITION = gql`
    mutation createCompetition($input: CreateCompetitionInput!) {
        createCompetition(input: $input) {
            id
        }
    }
`;

import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */
export const HELLO = gql`
    query hello {
        hello
    }
`;

export const HELLO2 = gql`
    query ListEvents {
        hello
    }
`;

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

export const GET_DATA_ENTITY = gql`
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

export const LIST_EVENTS = gql`
    query listEvents {
        listEvents {
            id
            name
            startTime
        }
    }
`;

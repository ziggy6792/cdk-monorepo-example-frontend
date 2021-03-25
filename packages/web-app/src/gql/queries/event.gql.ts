import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */

export const LIST_EVENTS = gql`
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

export const CREATE_EVENT = gql`
    mutation createEvent($input: CreateEventInput!) {
        createEvent(input: $input) {
            id
        }
    }
`;

export const UPDATE_EVENT = gql`
    mutation updateEvent($input: UpdateEventInput!) {
        updateEvent(input: $input) {
            id
        }
    }
`;

export const GET_EVENT = gql`
    query getEvent($id: ID!) {
        getEvent(id: $id) {
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

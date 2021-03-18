import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */

export const LIST_EVENTS = gql`
    query listEvents {
        listEvents {
            id
            name
            startTime
        }
    }
`;

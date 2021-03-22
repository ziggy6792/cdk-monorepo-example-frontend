import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */

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

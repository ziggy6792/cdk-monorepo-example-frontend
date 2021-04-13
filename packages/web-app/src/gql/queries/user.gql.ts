import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */

export const LIST_USERS = gql`
  query listUsers {
    listUsers {
      id
      fullName
    }
  }
`;

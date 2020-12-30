/* eslint-disable */
// For custom queries. This will not be overwritten

import gql from 'graphql-tag';

export const GET_AUTHENTICATED_USER = gql`
  query getAutenticatedUser {
    getAutenticatedUser @client {
      # (always: true)
      id
      email
      picture
      nameDisplayText
      isGuest
      isAuthenticated
      # isAdmin
      # isJudge
      # isRegistered
    }
  }
`;

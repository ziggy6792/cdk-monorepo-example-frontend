/* eslint-disable */
// For custom queries. This will not be overwritten

import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String, $password: String, $authType: String) {
    login(email: $email, password: $password, authType: $authType) @client {
      id
      email
      nameDisplayText
      isGuest
      # isRegistered
      # isJudge
      isAuthenticated
      # isAdmin
    }
  }
`;

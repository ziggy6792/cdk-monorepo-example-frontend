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

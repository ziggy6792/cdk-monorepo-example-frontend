import gql from 'graphql-tag';
import { BREADCRUMB_FIELDS } from './breadcrumbs.gql';

/* eslint-disable import/prefer-default-export */

const CORE_COMPETITION_FIELDS = gql`
  ${BREADCRUMB_FIELDS}
  fragment CoreCompetitionFields on Competition {
    ...BreadcrumbFields
    id
    event {
      id
    }
    hasDemoRiders
    name
    description
    level
    gender
    sport
    maxRiders
    judgeUserId
    judgeUser {
      id
      fullName
    }
    riderAllocations {
      items {
        userId
        user {
          id
          fullName
        }
        startSeed
      }
    }
    rounds {
      items {
        id
        name
        startTime
        heats {
          items {
            id
            isFinal
            name
            round {
              roundNo
            }
            size
            noAllocated
            createdAt
            status
            riderAllocations {
              items {
                user {
                  id
                  fullName
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_COMPETITION = gql`
  ${CORE_COMPETITION_FIELDS}
  query getCompetition($id: ID!) {
    getCompetition(id: $id) {
      ...CoreCompetitionFields
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

export const UPDATE_COMPETITION = gql`
  mutation updateCompetition($input: UpdateCompetitionInput!) {
    updateCompetition(input: $input) {
      id
    }
  }
`;

export const BUILD_COMPETITION = gql`
  mutation buildCompetition($params: CompetitionParamsInput!, $id: ID!) {
    buildCompetition(id: $id, params: $params) {
      id
    }
  }
`;

export const ALLOCATE_RIDERS = gql`
  mutation allocateRiders($id: ID!) {
    allocateRiders(id: $id) {
      id
      rounds {
        items {
          id
          heats {
            items {
              name
              riderAllocations {
                items {
                  userId
                  startSeed
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ADD_DEMO_RIDERS = gql`
  mutation addRemoveDemoRiders($id: ID!) {
    addRemoveDemoRiders(id: $id) {
      id
    }
  }
`;

export const END_HEAT = gql`
  ${CORE_COMPETITION_FIELDS}
  mutation endHeat($id: ID!, $validationLevel: ValidationItemType) {
    endHeat(id: $id, validationLevel: $validationLevel) {
      ... on Competition {
        ...CoreCompetitionFields
      }
      ... on ValidationItemList {
        items {
          message
          type
        }
      }
    }
  }
`;

import gql from 'graphql-tag';
import { BREADCRUMB_FIELDS } from './breadcrumbs.gql';

export const CORE_HEAT_FIELDS = gql`
  ${BREADCRUMB_FIELDS}
  fragment CoreHeatFields on Heat {
    ...BreadcrumbFields
    id
    isAdmin
    isJudge
    status
    name
    longName
    round {
      id
      roundNo
      longName
    }
    size
    noAllocated
    noProgressing
    createdAt
    riderAllocations {
      items {
        userId
        allocatableId
        user {
          id
          fullName
        }
        startSeed
        startOrder
        rankOrder
        position
        runs {
          score
        }
      }
    }
  }
`;

export const GET_HEAT = gql`
  ${CORE_HEAT_FIELDS}
  query getHeat($id: ID!) {
    getHeat(id: $id) {
      ...CoreHeatFields
    }
  }
`;

export const SCORE_RUN = gql`
  mutation scoreRun($input: ScorRunInput!) {
    scoreRun(input: $input) {
      id
    }
  }
`;

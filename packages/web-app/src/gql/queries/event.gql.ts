import gql from 'graphql-tag';
import { RANKED_RIDERS_FIELDS } from './competition.gql';
import { BREADCRUMB_FIELDS } from './breadcrumbs.gql';
import { CORE_HEAT_FIELDS } from './heat.gql';

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

// const CORE_COMPETITION_FIELDS = gql`
//   ${BREADCRUMB_FIELDS}
//   ${RANKED_RIDERS_FIELDS}
//   fragment CoreCompetitionFields on Competition {
//     ...BreadcrumbFields
//     ...RankedRidersFields

export const GET_EVENT = gql`
  ${BREADCRUMB_FIELDS}
  ${RANKED_RIDERS_FIELDS}
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      ...BreadcrumbFields
      isAdmin
      id
      name
      adminUser {
        id
        fullName
      }
      startTime
      description
      competitions {
        items {
          id
          status
          name
          startTime
          judgeUser {
            id
            fullName
          }
          ...RankedRidersFields
        }
      }
    }
  }
`;

export const GET_EVENT_SCHEDULE = gql`
  query getEventSchedule($id: ID!) {
    getEvent(id: $id) {
      name
      id
      isAdmin
      scheduleItems {
        items {
          scheduleId
          id
          startTime
          notice
          createdAt
          scheduledItem {
            ... on Round {
              id
              roundNo
              longName
              competition {
                id
              }
              heats {
                items {
                  id
                  name
                  status
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SELECT_HEAT = gql`
  ${CORE_HEAT_FIELDS}
  mutation selectHeat($id: ID!, $validationLevel: ValidationItemType) {
    selectHeat(id: $id, validationLevel: $validationLevel) {
      ... on Event {
        id
        selectedHeat {
          ...CoreHeatFields
        }
      }
      ... on ValidationItemList {
        items {
          message
          type
          ... on ValidationItemHeatAlreadyOpen {
            eventId
          }
        }
      }
    }
  }
`;

export const GET_SELECTED_HEAT = gql`
  ${CORE_HEAT_FIELDS}
  ${BREADCRUMB_FIELDS}
  query getSelectedHeat($id: ID!) {
    getEvent(id: $id) {
      id
      name
      selectedHeat {
        ...BreadcrumbFields
        ...CoreHeatFields
      }
    }
  }
`;

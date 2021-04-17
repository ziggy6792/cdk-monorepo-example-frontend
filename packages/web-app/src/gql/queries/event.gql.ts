import gql from 'graphql-tag';
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

export const GET_EVENT = gql`
  ${BREADCRUMB_FIELDS}
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      ...BreadcrumbFields
      isAdmin
      id
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
          startTime
          judgeUser {
            fullName
          }
        }
      }
    }
  }
`;

export const GET_EVENT_SCHEDULE = gql`
  query getEventSchedule($id: ID!) {
    getEvent(id: $id) {
      name
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
              roundNo
              longName
              heats {
                items {
                  id
                  name
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
  query getSelectedHeat($id: ID!) {
    getEvent(id: $id) {
      id
      selectedHeat {
        ...CoreHeatFields
      }
    }
  }
`;

import gql from 'graphql-tag';
import { CORE_HEAT_FIELDS } from './heat.gql';

/* eslint-disable import/prefer-default-export */

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
    query getEvent($id: ID!) {
        getEvent(id: $id) {
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
                            name
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
                    actionReferenceId
                }
            }
        }
    }
`;

// export const SELECT_HEAT = gql`
//     ${CORE_HEAT_FIELDS}
//     mutation selectHeat($id: ID!, validationLevel: ValidationItemType) {
//         selectHeat(id: $id,validationLevel: $validationLevel) {
//             ... on Event {
//                 id
//                 selectedHeat {
//                     ...CoreHeatFields
//                 }
//             }
//             ... on ValidationItemList {
//                 items {
//                     message
//                     type
//                     actionReferenceId
//                 }
//             }
//         }
//     }
// `;

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

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: listEvents
// ====================================================

export interface listEvents_listEvents {
  __typename: "Event";
  id: string | null;
  name: string;
  startTime: string;
}

export interface listEvents {
  listEvents: listEvents_listEvents[];
}

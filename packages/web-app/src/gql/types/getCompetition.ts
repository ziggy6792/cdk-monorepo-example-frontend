/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCompetition
// ====================================================

export interface getCompetition_getCompetition_rounds_items_heats_items_riderAllocations_items_runs {
  __typename: "Run";
  score: number | null;
}

export interface getCompetition_getCompetition_rounds_items_heats_items_riderAllocations_items {
  __typename: "RiderAllocation";
  userId: string;
  position: number | null;
  startSeed: number;
  runs: getCompetition_getCompetition_rounds_items_heats_items_riderAllocations_items_runs[] | null;
}

export interface getCompetition_getCompetition_rounds_items_heats_items_riderAllocations {
  __typename: "RiderAllocationList";
  items: getCompetition_getCompetition_rounds_items_heats_items_riderAllocations_items[];
}

export interface getCompetition_getCompetition_rounds_items_heats_items {
  __typename: "Heat";
  name: string;
  riderAllocations: getCompetition_getCompetition_rounds_items_heats_items_riderAllocations;
}

export interface getCompetition_getCompetition_rounds_items_heats {
  __typename: "HeatList";
  items: getCompetition_getCompetition_rounds_items_heats_items[];
}

export interface getCompetition_getCompetition_rounds_items {
  __typename: "Round";
  heats: getCompetition_getCompetition_rounds_items_heats;
}

export interface getCompetition_getCompetition_rounds {
  __typename: "RoundList";
  items: getCompetition_getCompetition_rounds_items[];
}

export interface getCompetition_getCompetition {
  __typename: "Competition";
  rounds: getCompetition_getCompetition_rounds;
}

export interface getCompetition {
  getCompetition: getCompetition_getCompetition;
}

export interface getCompetitionVariables {
  competitionId: string;
}

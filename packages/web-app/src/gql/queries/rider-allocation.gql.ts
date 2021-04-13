import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */

export const UPDATE_RIDER_ALLOCATIONS = gql`
  mutation updateRiderAllocations($input: [UpdateRiderAllocationInput!]!) {
    updateRiderAllocations(input: $input) {
      allocatableId
    }
  }
`;

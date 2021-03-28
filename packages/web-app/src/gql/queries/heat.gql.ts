import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */

export const GET_SELECTED_HEAT = gql`
    query getSelectedHeat($id: ID!) {
        getEvent(id: $id) {
            id
            selectedHeat {
                id
                status
                name
                round {
                    roundNo
                }
                size
                noAllocated
                createdAt
                riderAllocations {
                    items {
                        userId
                        user {
                            fullName
                        }
                        startSeed
                        startOrder
                        rankOrder
                        allocatableId
                        position
                        runs {
                            score
                        }
                    }
                }
            }
        }
    }
`;

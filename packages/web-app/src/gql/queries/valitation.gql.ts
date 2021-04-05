import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */

export const CHECK_CAN_OPEN_HEAT = gql`
    query checkCanOpenHeat($id: ID!) {
        getHeat(id: $id) {
            id
            checkCanOpen {
                type
                message
                actionReferenceId
            }
        }
    }
`;

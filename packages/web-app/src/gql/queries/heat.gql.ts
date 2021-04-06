import gql from 'graphql-tag';

export const CORE_HEAT_FIELDS = gql`
    fragment CoreHeatFields on Heat {
        id
        status
        name
        longName
        round {
            roundNo
        }
        size
        noAllocated
        noProgressing
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

/* eslint-disable import/prefer-default-export */

import gql from 'graphql-tag';

export const UPDATE_SCHEDULE_ITEM = gql`
    mutation updateScheduleItem($input: UpdateScheduleItemInput!) {
        updateScheduleItem(input: $input) {
            id
            startTime
        }
    }
`;

/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import _ from 'lodash';
import ProgressButton from 'src/components/ui/buttons/progress-button';
import { useAddDemoRidersMutation } from 'src/generated-types';
import { GET_COMPETITION } from 'src/gql/queries/competition.gql';

interface IEditSeedsProps {
    competitionId: string;
}

const AddDemoRiders: React.FC<IEditSeedsProps> = ({ competitionId }) => {
    const [allocateRiders] = useAddDemoRidersMutation({
        refetchQueries: [
            {
                query: GET_COMPETITION,
                variables: { id: competitionId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const onAllocateRiders = async (): Promise<void> => {
        const variables = { id: competitionId };
        await allocateRiders({ variables });
    };

    return (
        <>
            <ProgressButton onClick={onAllocateRiders}>Add Demo Riders</ProgressButton>
        </>
    );
};

export default AddDemoRiders;

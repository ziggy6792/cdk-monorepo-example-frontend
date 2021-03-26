/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import { Button, Grid, useTheme } from '@material-ui/core';
import { useAllocateRidersMutation } from 'src/generated-types';
import { GET_COMPETITION } from 'src/gql/queries/competition.gql';
import ProgressButton from 'src/components/ui/buttons/progress-button';

interface IEditCompetitionProps {
    competitionId: string;
}

const AllocateRiders: React.FC<IEditCompetitionProps> = ({ competitionId }) => {
    const theme = useTheme();

    const [allocateRiders] = useAllocateRidersMutation({
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
            <Grid container direction='column'>
                <Grid container direction='row' justify='center' style={{ marginTop: theme.spacing(2) }}>
                    <Grid item>
                        <ProgressButton onClick={onAllocateRiders}>Allocate Riders</ProgressButton>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AllocateRiders;

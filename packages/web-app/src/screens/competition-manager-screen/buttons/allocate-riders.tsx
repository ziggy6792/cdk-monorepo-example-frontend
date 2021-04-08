/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button, Grid, Typography, useTheme } from '@material-ui/core';
import { useAllocateRidersMutation } from 'src/generated-types';
import { GET_COMPETITION } from 'src/gql/queries/competition.gql';
import ProgressButton from 'src/components/ui/buttons/progress-button';
import Dialog from 'src/components/ui/dialog';
import ValidationMessages, { ValidationMessageType } from 'src/modules/validation/validation-messages';

interface IEditCompetitionProps {
    competitionId: string;
    disabled?: boolean;
}

const areYouSureMessage = {
    type: ValidationMessageType.WARN,
    message: 'Are you sure',
};

const AllocateRiders: React.FC<IEditCompetitionProps> = ({ competitionId, disabled }) => {
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
        setOpen(false);
    };

    const [open, setOpen] = useState(false);

    return (
        <>
            <Dialog open={open} setOpen={setOpen}>
                {/* <EventForm onSubmit={onCreateEvent} title='Create New Event' onCancel={() => setOpen(false)} /> */}
                <Grid container direction='row' justify='center'>
                    <Grid item>
                        <Typography>Allocatte Riders</Typography>
                    </Grid>
                </Grid>
                <ValidationMessages
                    validationMessages={[
                        {
                            type: ValidationMessageType.WARN,
                            message: 'This action will clear any existing competition results and reset the competitoin. Are you sure?',
                        },
                    ]}
                />
                <Grid container direction='row' justify='center'>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <ProgressButton onClick={onAllocateRiders}>Allocate Riders</ProgressButton>
                </Grid>
            </Dialog>
            <Button onClick={() => setOpen(true)} disabled={disabled}>
                Allocate Riders
            </Button>
        </>
    );
};

export default AllocateRiders;

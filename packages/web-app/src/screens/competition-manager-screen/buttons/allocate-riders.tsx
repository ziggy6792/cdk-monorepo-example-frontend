/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button, Grid, Typography, useTheme } from '@material-ui/core';
import { useAllocateRidersMutation } from 'src/generated-types';
import { GET_COMPETITION } from 'src/gql/queries/competition.gql';
import ProgressButton from 'src/components/ui/buttons/progress-button';
import Dialog from 'src/components/ui/dialog';
import NotifyMessages, { NotifyMessageType } from 'src/modules/notify-messages/notify-messages';
import ConfirmBox from 'src/modules/confirm-box';

interface IEditCompetitionProps {
    competitionId: string;
    disabled?: boolean;
}

const areYouSureMessage = {
    type: NotifyMessageType.WARN,
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
                <ConfirmBox
                    title='Allocatte Riders'
                    confirmButton={{
                        onClick: onAllocateRiders,
                        text: 'Allocatte Riders',
                    }}
                    cancelButton={{ onClick: () => setOpen(false) }}
                >
                    <NotifyMessages
                        notifyMessages={[
                            {
                                type: NotifyMessageType.WARN,
                                message: 'This action will clear any existing competition results and reset the competitoin. Are you sure?',
                            },
                        ]}
                    />
                </ConfirmBox>
            </Dialog>
            <Button onClick={() => setOpen(true)} disabled={disabled}>
                Allocate Riders
            </Button>
        </>
    );
};

export default AllocateRiders;

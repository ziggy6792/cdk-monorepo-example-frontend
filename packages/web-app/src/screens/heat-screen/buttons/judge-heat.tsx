/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import {
    useSelectHeatMutation,
    ValidationItem,
    ValidationItemType,
    ValidationItemMessage,
    ValidationItemBase,
    ValidationItemHeatAlreadyOpen,
} from 'src/generated-types';
import { useHistory } from 'react-router';
import { ROUTE_SCOREBOARD } from 'src/config/routes';
import ProgressButton from 'src/components/ui/buttons/progress-button';
import Dialog from 'src/components/ui/dialog';
import ValidationItems, { ValidationItemContent } from 'src/modules/validation-items';
import { Button, Grid, Link, Typography } from '@material-ui/core';

interface IJudgeHeat {
    heatId: string;
    heatName: string;
}

const JudgeHeat: React.FC<IJudgeHeat> = ({ heatId, heatName }) => {
    const history = useHistory();

    const [selectHeat] = useSelectHeatMutation();

    // const { refetch: checkCanOpen } = useCheckCanOpenHeatQuery({ fetchPolicy: 'cache-and-network', skip: true });

    const [open, setOpen] = useState(false);
    const [validationItems, setValidationItems] = useState<ValidationItemBase[]>([]);

    const onSelectHeat = async (validationLevel: ValidationItemType = ValidationItemType.Warn): Promise<void> => {
        const response = await selectHeat({ variables: { id: heatId, validationLevel } });
        if (response.data.selectHeat.__typename === 'ValidationItemList') {
            setValidationItems(response.data.selectHeat.items);
            setOpen(true);
        } else if (response.data.selectHeat.__typename === 'Event') {
            history.push(`${ROUTE_SCOREBOARD}/${response.data.selectHeat.id}`);
        }

        return null;
    };

    const validationMessageLookup = {
        [ValidationItemMessage.OpenheatAlreadyopen]: 'Another heat is already open in the event scorebaord. Please close it first.',
        [ValidationItemMessage.OpenheatNoriders]: 'There are no riders allocated to this heat.',
        [ValidationItemMessage.OpenheatNotfull]: 'This heat is not yet fully allocated.',
        [ValidationItemMessage.OpenheatNotready]: 'This heat is not ready to judge as allocations will depend on the results of former heats.',
        [ValidationItemMessage.OpenheatToofewriders]: 'There are not enough riders allocated to this heat.',
        [ValidationItemMessage.OpenheatAlreadyfinished]: 'This heat has been closed once already. Are you sue you want to re-open it?',
    };

    const validationItemContent: ValidationItemContent = (validationItem: ValidationItem | ValidationItemHeatAlreadyOpen) => {
        const message = validationMessageLookup[validationItem.message];
        if (validationItem.__typename === 'ValidationItemHeatAlreadyOpen') {
            return {
                action: <Link href={`${ROUTE_SCOREBOARD}/${validationItem.eventId}`}>Open Scoreboard</Link>,
                message,
            };
        }
        return {
            message,
        };
    };

    return (
        <>
            <Dialog open={open} setOpen={setOpen}>
                {/* <EventForm onSubmit={onCreateEvent} title='Create New Event' onCancel={() => setOpen(false)} /> */}
                <Grid container direction='row' justify='center'>
                    <Grid item>
                        <Typography>Judge {heatName}</Typography>
                    </Grid>
                </Grid>
                <ValidationItems validationItems={validationItems} validationItemContent={validationItemContent} />

                <Grid container direction='row' justify='center'>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <ProgressButton
                        onClick={() => onSelectHeat(ValidationItemType.Error)}
                        disabled={!!validationItems.find((item) => item.type === ValidationItemType.Error)}
                    >
                        Judge Heat
                    </ProgressButton>
                </Grid>
            </Dialog>
            <ProgressButton onClick={onSelectHeat}>Judge Heat</ProgressButton>
        </>
    );
};

export default JudgeHeat;

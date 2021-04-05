/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { useSelectHeatMutation, useCheckCanOpenHeatQuery, ValidationItem, ValidationItemType, ValidationItemMessage } from 'src/generated-types';
import { useHistory } from 'react-router';
import { ROUTE_SCOREBOARD } from 'src/config/routes';
import ProgressButton from 'src/components/ui/buttons/progress-button';
import Dialog from 'src/components/ui/dialog';
import ValidationItems from 'src/modules/validation-items/validation-items';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import { ValidationItemContent } from 'src/modules/validation-items/validation-item';

interface IJudgeHeat {
    heatId: string;
    heatName: string;
}

const JudgeHeat: React.FC<IJudgeHeat> = ({ heatId, heatName }) => {
    const history = useHistory();

    const [selectHeat] = useSelectHeatMutation();

    const { refetch: checkCanOpen } = useCheckCanOpenHeatQuery({ fetchPolicy: 'cache-and-network', skip: true });

    const [open, setOpen] = useState(false);
    const [validationItems, setValidationItems] = useState<ValidationItem[]>([]);

    const onClickJudgeHeat = async (): Promise<void> => {
        const response = await checkCanOpen({ id: heatId });
        const judgeHeatValidationItems = response.data.getHeat.checkCanOpen;
        if (judgeHeatValidationItems.length > 0) {
            setValidationItems(judgeHeatValidationItems);
            setOpen(true);
        } else {
            await onSelectHeat();
        }
        return null;
    };

    const onSelectHeat = async (): Promise<void> => {
        const response = await selectHeat({ variables: { id: heatId } });
        history.push(`${ROUTE_SCOREBOARD}/${response.data.selectHeat.id}`);
        return null;
    };

    const validationItemContent: ValidationItemContent = {
        [ValidationItemMessage.OpenheatAlreadyopen]: {
            action: (valItem: ValidationItem) => <Link href={`${ROUTE_SCOREBOARD}/${valItem.actionReferenceId}`}>Open Scoreboard</Link>,
            message: () => 'Another heat is already open in the event scorebaord. Please close it first.',
        },
        [ValidationItemMessage.OpenheatNoriders]: {
            message: () => 'There are no riders allocated to this heat.',
        },
        [ValidationItemMessage.OpenheatNotfull]: {
            message: () => 'This heat is not yet fully allocated.',
        },
        [ValidationItemMessage.OpenheatToofewriders]: {
            message: () => 'There are not enough riders allocated to this heat.',
        },
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
                    <ProgressButton onClick={onSelectHeat} disabled={!!validationItems.find((item) => item.type === ValidationItemType.Error)}>
                        Judge Heat
                    </ProgressButton>
                </Grid>
            </Dialog>
            <ProgressButton onClick={onClickJudgeHeat}>Judge Heat</ProgressButton>
        </>
    );
};

export default JudgeHeat;

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
        setValidationItems(response.data.getHeat.checkCanOpen);
        setOpen(true);
        return null;
    };

    const onConfirm = async (): Promise<void> => {
        const response = await selectHeat({ variables: { id: heatId } });
        history.push(`${ROUTE_SCOREBOARD}/${response.data.selectHeat.id}`);
        return null;
    };

    const validationActions = {
        [ValidationItemMessage.OpenheatAlreadyopen]: (valItem: ValidationItem) => (
            <Link href={`${ROUTE_SCOREBOARD}/${valItem.referenceId}`}>Open Scoreboard</Link>
        ),
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
                <ValidationItems validationItems={validationItems} validationActions={validationActions} />

                <Grid container direction='row' justify='center'>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <ProgressButton onClick={onConfirm} disabled={!!validationItems.find((item) => item.type === ValidationItemType.Error)}>
                        Judge Heat
                    </ProgressButton>
                </Grid>
            </Dialog>
            <ProgressButton onClick={onClickJudgeHeat}>Judge Heat</ProgressButton>
        </>
    );
};

export default JudgeHeat;

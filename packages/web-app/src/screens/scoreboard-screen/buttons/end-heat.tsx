/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { useEndHeatMutation } from 'src/generated-types';
import { useHistory } from 'react-router';
import { ROUTE_COMPETITION } from 'src/config/routes';
import ProgressButton from 'src/components/ui/buttons/progress-button';
import Dialog from 'src/components/ui/dialog';
import { Button, Grid } from '@material-ui/core';
import NotifyMessages, { NotifyMessageType } from 'src/modules/notify-messages/notify-messages';

interface IJudgeHeat {
    heatId: string;
}

const EndHeat: React.FC<IJudgeHeat> = ({ heatId }) => {
    const history = useHistory();

    const [endHeat] = useEndHeatMutation();

    const [open, setOpen] = useState(false);

    const onEndHeat = async (): Promise<void> => {
        const response = await endHeat({ variables: { id: heatId } });
        history.push(`${ROUTE_COMPETITION}/${response.data.endHeat.id}`);

        return null;
    };

    return (
        <>
            <Dialog
                open={open}
                setOpen={setOpen}
                title='End Heat'
                buttons={
                    <>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <ProgressButton onClick={onEndHeat}>End Heat</ProgressButton>
                    </>
                }
            >
                <NotifyMessages
                    notifyMessages={[
                        {
                            type: NotifyMessageType.WARN,
                            message: 'This action will clear any existing competition results and reset the competitoin. Are you sure?',
                        },
                    ]}
                />
            </Dialog>
            <Button onClick={() => setOpen(true)}>End Heat</Button>
        </>
    );
};

export default EndHeat;

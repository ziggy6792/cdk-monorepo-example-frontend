/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import { useSelectHeatMutation } from 'src/generated-types';
import { useHistory } from 'react-router';
import { ROUTE_SCOREBOARD } from 'src/config/routes';
import ProgressButton from 'src/components/ui/buttons/progress-button';

interface IJudgeHeat {
    heatId: string;
}

const JudgeHeat: React.FC<IJudgeHeat> = ({ heatId }) => {
    const history = useHistory();

    const [selectHeat] = useSelectHeatMutation();

    const onSelectHeat = async (): Promise<void> => {
        const response = await selectHeat({ variables: { id: heatId } });
        history.push(`${ROUTE_SCOREBOARD}/${response.data.selectHeat.id}`);
        return null;
    };

    return <ProgressButton onClick={onSelectHeat}>Judge Heat</ProgressButton>;
};

export default JudgeHeat;

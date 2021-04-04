/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import { useEndHeatMutation } from 'src/generated-types';
import { useHistory } from 'react-router';
import { ROUTE_COMPETITION } from 'src/config/routes';
import ProgressButton from 'src/components/ui/buttons/progress-button';

interface IJudgeHeat {
    heatId: string;
}

const EndHeat: React.FC<IJudgeHeat> = ({ heatId }) => {
    const history = useHistory();

    const [endHeat] = useEndHeatMutation();

    const onEndHeat = async (): Promise<void> => {
        const response = await endHeat({ variables: { id: heatId } });
        history.push(`${ROUTE_COMPETITION}/${response.data.endHeat.id}`);

        return null;
    };

    return <ProgressButton onClick={onEndHeat}>End Heat</ProgressButton>;
};

export default EndHeat;

import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import Spinner from 'src/components/spinner';
import { useCustomGetSelectedHeatQuery } from 'src/gql/custom-hooks/use-custom-get-selected-heat';
import HeatSummary from 'src/modules/summary/heat-summary';
import ScoresTables from './scoreboard-tables';
import EndHeat from './buttons/end-heat';

interface IScoreboardScreenProps {
    eventId: string;
}

const ScoreboardScreen: React.FC<IScoreboardScreenProps> = ({ eventId }) => {
    const { loading, data, stopPolling, startPolling } = useCustomGetSelectedHeatQuery({ variables: { id: eventId } });

    useEffect(
        () => {
            startPolling(5000);
            return () => {
                stopPolling();
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Grid container direction='column' justify='center' alignItems='center'>
                <HeatSummary summary={data.selectedHeat} />
                <Grid item>
                    <EndHeat heatId={data.selectedHeat.id} />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <ScoresTables
                        riderAllocations={data.selectedHeat.riderAllocations.items}
                        eventId={eventId}
                        noProgressing={data.selectedHeat.noProgressing}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default ScoreboardScreen;

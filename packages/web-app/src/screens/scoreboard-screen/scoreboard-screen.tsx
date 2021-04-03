import { Grid } from '@material-ui/core';
import React from 'react';
import Spinner from 'src/components/spinner';
import { useCustomGetSelectedHeatQuery } from 'src/gql/custom-hooks/use-custom-get-selected-heat';
import ScoresTables from './scoreboard-tables';

interface IScoreboardScreenProps {
    eventId: string;
}

const ScoreboardScreen: React.FC<IScoreboardScreenProps> = ({ eventId }) => {
    const { loading, data } = useCustomGetSelectedHeatQuery({ variables: { id: eventId }, pollInterval: 5000 });

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Grid container direction='column' justify='center' alignItems='center'>
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
import { Grid } from '@material-ui/core';
import React from 'react';
import Spinner from 'src/components/spinner';
import { useGetHeatQuery } from 'src/generated-types';
import ScoresTables from './results-table';

interface IScoreboardScreenProps {
    heatId: string;
}

const HeatScreen: React.FC<IScoreboardScreenProps> = ({ heatId }) => {
    // const { loading, data } = useCustomGetSelectedHeatQuery({ variables: { id: eventId }, pollInterval: 5000 });
    const { loading, data } = useGetHeatQuery({ variables: { id: heatId }, pollInterval: 5000 });
    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item style={{ width: '100%' }}>
                    <ScoresTables riderAllocations={data.getHeat.riderAllocations.items} eventId='123' noProgressing={data.getHeat.noProgressing} />
                </Grid>
            </Grid>
        </>
    );
};

export default HeatScreen;

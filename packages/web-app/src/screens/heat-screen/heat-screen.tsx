import { Grid } from '@material-ui/core';
import React from 'react';
import Spinner from 'src/components/spinner';
import { useGetHeatQuery } from 'src/generated-types';
import HeatSummary from 'src/modules/summary/heat-summary';
import JudgeHeat from './buttons/judge-heat';
import ResultsTable from './results-table';

interface IScoreboardScreenProps {
    heatId: string;
}

const HeatScreen: React.FC<IScoreboardScreenProps> = ({ heatId }) => {
    const { loading, data } = useGetHeatQuery({ variables: { id: heatId }, pollInterval: 5000 });
    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Grid container direction='column' justify='center' alignItems='center'>
                <HeatSummary summary={data.getHeat} />
                <Grid item>
                    <JudgeHeat heatId={heatId} />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <ResultsTable riderAllocations={data.getHeat.riderAllocations.items} noProgressing={data.getHeat.noProgressing} />
                </Grid>
            </Grid>
        </>
    );
};

export default HeatScreen;

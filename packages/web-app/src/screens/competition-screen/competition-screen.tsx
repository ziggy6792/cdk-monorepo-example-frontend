import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useGetCompetitionQuery } from 'src/generated-types';
import _ from 'lodash';
import Spinner from 'src/components/spinner';
import HeatsTable from './heats-table';
import RiderAllocationsTable from './rider-allocations-table';

interface IEventsScreenProps {
    competitionId: string;
}

const CompetitionScreen: React.FC<IEventsScreenProps> = ({ competitionId }) => {
    const { loading, data } = useGetCompetitionQuery({ variables: { id: competitionId } });

    const heats = !loading ? _.flatten(data.getCompetition.rounds.items.map(round => round.heats.items)) : [];
    const riderAllocations = !loading ? data.getCompetition.riderAllocations.items : [];

    console.log('heats', heats);

    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <Grid container direction='column' justify='center' alignItems='center'>
                    <Grid container>
                        {/* ToDo fix this */}
                        <Grid item style={{ width: '100%' }}>
                            <RiderAllocationsTable rierAllocations={riderAllocations} />
                        </Grid>
                        <Grid item style={{ width: '100%' }}>
                            <HeatsTable heats={heats} />
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default CompetitionScreen;

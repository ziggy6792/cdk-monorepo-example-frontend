import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useGetCompetitionQuery } from 'src/generated-types';
import _ from 'lodash';
import Spinner from 'src/components/spinner';
import HeatsTable from './heats-table';
import RiderAllocationsTable from './rider-allocations-table';
import CompetitionSummary from './competition-summary';
import EditCompetition from './buttons/edit-competition';
import EditSeeds from './buttons/edit-seeds';
import BuildCompetition from './buttons/build-competition';

interface IEventsScreenProps {
    competitionId: string;
}

const CompetitionScreen: React.FC<IEventsScreenProps> = ({ competitionId }) => {
    const { loading, data } = useGetCompetitionQuery({ variables: { id: competitionId } });

    const heats = !loading ? _.flatten(data.getCompetition.rounds.items.map((round) => round.heats.items)) : [];
    const riderAllocations = !loading ? data.getCompetition.riderAllocations.items : [];

    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <Grid container direction='column' justify='center' alignItems='center'>
                    <Grid item style={{ width: '100%' }}>
                        <CompetitionSummary summary={data.getCompetition} />
                    </Grid>
                    <Grid container direction='row' justify='center' alignItems='center'>
                        <Grid item>
                            <EditCompetition
                                competitionToEdit={{
                                    id: data.getCompetition.id,
                                    description: data.getCompetition.description,
                                    name: data.getCompetition.name,
                                    level: data.getCompetition.level,
                                    sport: data.getCompetition.sport,
                                    gender: data.getCompetition.gender,
                                    maxRiders: data.getCompetition.maxRiders,
                                }}
                                judgeUser={data.getCompetition.judgeUser}
                            />
                        </Grid>
                        <Grid item>
                            <EditSeeds riderAllocations={data.getCompetition.riderAllocations.items} competitionId={competitionId} />
                        </Grid>
                        <Grid item>
                            <BuildCompetition competitionId={competitionId} />
                        </Grid>
                    </Grid>

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

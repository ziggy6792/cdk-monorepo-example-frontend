import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useGetCompetitionQuery } from 'src/generated-types';
import _ from 'lodash';
import Spinner from 'src/components/spinner';
import CompetitionSummary from 'src/modules/competition-summary';
import { ROUTE_COMPETITION_MANAGER } from 'src/config/routes';
import { useHistory } from 'react-router';
import HeatsStructure from './heats-structure/heats-structure';

interface IEventsScreenProps {
    competitionId: string;
}

const CompetitionScreen: React.FC<IEventsScreenProps> = ({ competitionId }) => {
    const { loading, data } = useGetCompetitionQuery({ variables: { id: competitionId } });

    // const heats = !loading ? _.flatten(data.getCompetition.rounds.items.map((round) => round.heats.items)) : [];
    // const riderAllocations = !loading ? data.getCompetition.riderAllocations.items : [];

    // const disabledRiderAllocationButtons = data?.getCompetition.riderAllocations.items.length < 1;

    const history = useHistory();

    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <Grid container direction='column' justify='center' alignItems='center'>
                    <Grid container direction='row' justify='flex-end' alignItems='center'>
                        <Grid item>
                            <Button
                                onClick={() => {
                                    history.push(`${ROUTE_COMPETITION_MANAGER}/${competitionId}`);
                                }}
                            >
                                Open Competition Manager
                            </Button>
                        </Grid>
                    </Grid>
                    {/* ToDo: Fix this */}
                    <Grid item style={{ width: '100%' }}>
                        <CompetitionSummary summary={data.getCompetition} />
                    </Grid>
                    <Grid item style={{ width: '90%' }}>
                        <HeatsStructure rounds={data.getCompetition.rounds.items} />
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default CompetitionScreen;

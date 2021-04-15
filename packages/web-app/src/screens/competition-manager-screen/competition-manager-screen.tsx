import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useGetCompetitionQuery } from 'src/generated-types';
import _ from 'lodash';
import Spinner from 'src/components/spinner';
import CompetitionSummary from 'src/modules/summary/competition-summary';
import { Redirect, useHistory } from 'react-router';
import { ROUTE_COMPETITION, ROUTE_PROFILE } from 'src/config/routes';
import HeatsTable from './heats-table';
import RiderAllocationsTable from './rider-allocations-table';
import EditCompetition from './buttons/edit-competition';
import EditSeeds from './buttons/edit-seeds';
import BuildCompetition from './buttons/build-competition';
import AllocateRiders from './buttons/allocate-riders';
import AddRemoveDemoRiders from './buttons/add-remove-demo-riders';

interface IEventsScreenProps {
  competitionId: string;
}

const CompetitionManagerScreen: React.FC<IEventsScreenProps> = ({ competitionId }) => {
  const { loading, data } = useGetCompetitionQuery({ variables: { id: competitionId } });

  const heats = !loading ? _.flatten(data.getCompetition.rounds.items.map((round) => round.heats.items)) : [];
  const riderAllocations = !loading ? data.getCompetition.riderAllocations.items : [];

  const disabledRiderAllocationButtons = data?.getCompetition.riderAllocations.items.length < 1;

  const history = useHistory();

  return (
    <>
      {loading && <Spinner />}
      {!loading && !data.getCompetition.isAdmin && <Redirect to={ROUTE_PROFILE} />}
      {!loading && (
        <Grid container direction='column' justify='center' alignItems='center'>
          <Grid container direction='row' justify='flex-end' alignItems='center'>
            <Grid item>
              <Button
                onClick={() => {
                  history.push(`${ROUTE_COMPETITION}/${competitionId}`);
                }}
              >
                Open Competition Page
              </Button>
            </Grid>
          </Grid>

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
              <BuildCompetition competitionId={competitionId} />
            </Grid>
            <Grid item>
              <AddRemoveDemoRiders
                competitionId={competitionId}
                hasDemoRiders={data.getCompetition.hasDemoRiders}
                disabled={!data.getCompetition.rounds?.items?.length}
              />
            </Grid>
            <Grid item>
              <EditSeeds
                riderAllocations={data.getCompetition.riderAllocations.items}
                competitionId={competitionId}
                disabled={disabledRiderAllocationButtons}
              />
            </Grid>
            <Grid item>
              <AllocateRiders competitionId={competitionId} disabled={disabledRiderAllocationButtons} />
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

export default CompetitionManagerScreen;

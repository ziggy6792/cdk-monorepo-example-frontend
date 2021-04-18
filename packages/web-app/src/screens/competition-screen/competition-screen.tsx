import React from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router';

import { Button, Grid } from '@material-ui/core';
import { Build } from '@material-ui/icons';

import { useGetCompetitionQuery } from 'src/generated-types';
import Spinner from 'src/components/spinner';
import CompetitionSummary from 'src/modules/summary/competition-summary';
import { ROUTE_COMPETITION_MANAGER } from 'src/config/routes';
import Breadcrumbs from 'src/modules/breadcrumbs/breadcrumbs';

import HeatsStructure from './heats-structure/heats-structure';
import Podium from './podium';

interface IEventsScreenProps {
  competitionId: string;
}

const CompetitionScreen: React.FC<IEventsScreenProps> = ({ competitionId }) => {
  const { data } = useGetCompetitionQuery({ variables: { id: competitionId } });

  const history = useHistory();

  return (
    <>
      {!data && <Spinner />}
      {data && (
        <>
          <Breadcrumbs breadcrumbs={data.getCompetition.breadcrumbs} />
          <Grid container direction='column' justify='center' alignItems='center'>
          <Grid item>
            <Button
              startIcon={<Build />}
              variant='contained'
              color='primary'
              onClick={() => {
                history.push(`${ROUTE_COMPETITION_MANAGER}/${competitionId}`);
              }}
            >
              Competition Manager
            </Button>
            </Grid>

            {/* ToDo: Fix this */}

            <Grid item style={{ width: '100%' }}>
              <CompetitionSummary summary={data.getCompetition} />
            </Grid>
            {data.getCompetition.winners.items.length === 3 && (
              <Grid item style={{ width: '80%', maxWidth: '500px' }}>
                <Podium winners={data.getCompetition.winners.items} />
              </Grid>
            )}
            <Grid item style={{ width: '95%' }}>
              <HeatsStructure rounds={data.getCompetition.rounds.items} eventId={data.getCompetition.event.id} />
            </Grid>
          </Grid>
          )
        </>
      )}
    </>
  );
};

export default CompetitionScreen;

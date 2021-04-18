import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Spinner from 'src/components/spinner';
import { useCustomGetSelectedHeatQuery } from 'src/gql/custom-hooks/use-custom-get-selected-heat';
import HeatSummary from 'src/modules/summary/heat-summary';
import ScreenWrapper from 'src/components/ui/screen-wrapper';

import ScoresTables from './scoreboard-tables';
import EndHeat from './buttons/end-heat';

interface IScoreboardScreenProps {
  eventId: string;
}

const ScoreboardScreen: React.FC<IScoreboardScreenProps> = ({ eventId }) => {
  const { data, stopPolling, startPolling } = useCustomGetSelectedHeatQuery({ variables: { id: eventId } });

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

  if (!data) {
    return (
      <ScreenWrapper eventTitle='' eventId={eventId} currentPath='live' dense>
        <Spinner />
      </ScreenWrapper>
    );
  }

  // return <div>hello</div>;

  if (!data.selectedHeat) {
    return (
      <ScreenWrapper eventId={eventId} currentPath='live' onlyBottom>
        <Grid container justify='center' alignItems='center' style={{ height: '100vh' }}>
          <Grid item>
            <Typography
              variant='h6'
              component='div'
              color='primary'
              style={{ textAlign: 'center', lineHeight: 1.2, textTransform: 'none' }}
            >
              There are currently no live heats.
              <br />
              Check back in a bit!
            </Typography>
          </Grid>
        </Grid>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper eventId={eventId} currentPath='live' onlyBottom>
      <Grid container direction='column' justify='center' alignItems='center'>
        <HeatSummary heat={data.selectedHeat} />
        {data.selectedHeat.isJudge && (
          <Grid item>
            <EndHeat heat={data.selectedHeat} />
          </Grid>
        )}
        <Grid item style={{ width: '100%' }}>
          <ScoresTables riderAllocations={data.selectedHeat.riderAllocations.items} eventId={eventId} noProgressing={data.selectedHeat.noProgressing} />
        </Grid>
      </Grid>
    </ScreenWrapper>
  );
};

export default ScoreboardScreen;

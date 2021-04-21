import React, { useEffect } from 'react';
import * as routeConfig from 'src/config/routes';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Container, Button, Box } from '@material-ui/core';
import { useCustomGetSelectedHeatQuery } from 'src/gql/custom-hooks/use-custom-get-selected-heat';
import ScreenWrapper from 'src/components/ui/screen-wrapper';
import FabMenu from 'src/components/ui/fab-menu';
import EndHeat from 'src/screens/scoreboard-screens/shared/buttons/end-heat';
import NoLiveHeats from 'src/screens/scoreboard-screens/shared/no-live-heats';
import scoreboardConfig from 'src/screens/scoreboard-screens/shared/scoreboard-config';
import Breadcrumbs from 'src/modules/breadcrumbs/breadcrumbs';
import EditScoreboardTable from './edit-scoreboard-table';

interface IMatchParams {
  eventId: string;
}

type IProps = RouteComponentProps<IMatchParams>;

const ScoreboardEditScreen: React.FC<IProps> = ({ match, history }) => {
  const { eventId } = match.params;
  const { data, stopPolling, startPolling } = useCustomGetSelectedHeatQuery({ variables: { id: eventId } });

  useEffect(
    () => {
      startPolling(scoreboardConfig.SCOREBOARD_POLL_RATE);
      return () => {
        stopPolling();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onClickBack = () => history.push(`${routeConfig.ROUTE_LIVE}/${eventId}`);

  const eventName = data?.eventName;

  return (
    <>
      {/* Redirect non judges to readonly screen */}
      {data?.selectedHeat && !data.selectedHeat.isJudge && <Redirect to={`${routeConfig.ROUTE_LIVE}/${eventId}`} />}
      <ScreenWrapper eventTitle={eventName} eventId={eventId} currentPath='live' showSpinner={!data}>
        {data && (
          <>
            {!data.selectedHeat && <NoLiveHeats />}
            {data.selectedHeat && (
              <Container maxWidth='md'>
                <Box p={3}>
                  <Button color='primary' variant='contained' style={{ marginBottom: 20 }} onClick={onClickBack}>
                    BACK
                  </Button>
                  <EditScoreboardTable
                    riderAllocations={data.selectedHeat.riderAllocations.items}
                    noProgressing={data.selectedHeat.noProgressing}
                    eventId={eventId}
                  />
                  <FabMenu>
                    <FabMenu.Item>
                      <EndHeat heat={data.selectedHeat} onSucessfull={onClickBack} />
                    </FabMenu.Item>
                  </FabMenu>
                </Box>
              </Container>
            )}
          </>
        )}
      </ScreenWrapper>
    </>
  );
};

export default ScoreboardEditScreen;

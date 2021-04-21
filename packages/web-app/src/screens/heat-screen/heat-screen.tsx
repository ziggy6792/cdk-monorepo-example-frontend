import { Grid } from '@material-ui/core';
import React from 'react';
import { HeatStatus, useGetHeatQuery } from 'src/generated-types';
import Breadcrumbs from 'src/modules/breadcrumbs/breadcrumbs';
import ScreenWrapper from 'src/components/ui/screen-wrapper';
import HeatSummary from 'src/modules/summary/heat-summary';
import { Redirect } from 'react-router';
import { ROUTE_LIVE } from 'src/config/routes';
import JudgeHeat from './buttons/judge-heat';
import ResultsTable from './results-table';
import { ScoresTableType } from './results-table/results-table';

interface IScoreboardScreenProps {
  heatId: string;
}

const heatStatusToTableType = (status: HeatStatus) => {
  switch (status) {
    case HeatStatus.Finished:
      return ScoresTableType.RESULTS;
    default:
      return ScoresTableType.START_LIST;
  }
};

const HeatScreen: React.FC<IScoreboardScreenProps> = ({ heatId }) => {
  const { data } = useGetHeatQuery({ variables: { id: heatId } });

  const { id: eventId, name: eventTitle } = data?.getHeat.breadcrumbs.items.find((item) => item.type === 'EVENT') || {};

  return (
    <>
      {[HeatStatus.SelectedFinished, HeatStatus.SelectedInProgress].includes(data?.getHeat.status) && <Redirect to={`${ROUTE_LIVE}/${eventId}`} />}
      <ScreenWrapper eventTitle={eventTitle} eventId={eventId} currentPath='tournament' onlyBottom showSpinner={!data}>
        {data && (
          <>
            <Breadcrumbs breadcrumbs={data.getHeat.breadcrumbs} />
            <Grid container direction='column' justify='center' alignItems='center'>
              <HeatSummary heat={data.getHeat} />
              {data.getHeat.isJudge && (
                <Grid item>
                  <JudgeHeat heat={data.getHeat} />
                </Grid>
              )}
              <Grid item style={{ width: '100%' }}>
                <ResultsTable
                  tableType={heatStatusToTableType(data.getHeat.status)}
                  riderAllocations={data.getHeat.riderAllocations.items}
                  noProgressing={data.getHeat.noProgressing}
                />
              </Grid>
            </Grid>
          </>
        )}
      </ScreenWrapper>
    </>
  );
};

export default HeatScreen;

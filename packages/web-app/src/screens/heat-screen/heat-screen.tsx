import { Grid } from '@material-ui/core';
import React from 'react';
import Spinner from 'src/components/spinner';
import { HeatStatus, useGetHeatQuery } from 'src/generated-types';
import Breadcrumbs from 'src/modules/breadcrumbs/breadcrumbs';
import ScreenWrapper from 'src/components/ui/screen-wrapper';
import HeatSummary from 'src/modules/summary/heat-summary';
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
  if (!data) {
    return <Spinner />;
  }
  
  const eventId = data.getHeat.breadcrumbs.items.find((item) => item.type === "EVENT").id;
  const eventTitle = data.getHeat.breadcrumbs.items.find((item) => item.type === "EVENT").name;

  return (
    <ScreenWrapper eventTitle={eventTitle} eventId={eventId} currentPath='live'>
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
    </ScreenWrapper>
  );
};

export default HeatScreen;

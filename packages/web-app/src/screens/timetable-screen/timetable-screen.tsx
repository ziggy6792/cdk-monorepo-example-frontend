import { Grid } from '@material-ui/core';
import React from 'react';
import Spinner from 'src/components/spinner';
import ScreenWrapper from 'src/components/ui/screen-wrapper';
import { useGetEventScheduleQuery } from 'src/generated-types';
import Timetable from './timetable';

interface IScoreboardScreenProps {
  eventId: string;
}

const TimetableScreen: React.FC<IScoreboardScreenProps> = ({ eventId }) => {
  const { data } = useGetEventScheduleQuery({ variables: { id: eventId } });

  return (
    <ScreenWrapper eventId={eventId} currentPath='timetable' dense showSpinner={!data}>
      {data && (
        <Grid container direction='column' justify='center' alignItems='center'>
          <Timetable
            scheduleItems={data.getEvent.scheduleItems.items}
            eventId={eventId}
            isAdmin={data.getEvent.isAdmin}
            liveHeatId={data.getEvent.selectedHeatId}
          />
        </Grid>
      )}
    </ScreenWrapper>
  );
};
export default TimetableScreen;

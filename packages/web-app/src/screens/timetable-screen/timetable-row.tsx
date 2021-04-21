/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Typography, Grid, Link, Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import DateFormatter from 'src/utils/format/date-formatter';
import { TimetableScheduleItem } from 'src/gql/common/types';
import Dialog from 'src/components/ui/dialog';
import TimetableForm, { ITimetableFormValues } from 'src/modules/forms/timetable-form/timetable-form';
import { useUpdateScheduleItemMutation } from 'src/generated-types';
import { GET_EVENT_SCHEDULE } from 'src/gql/queries/event.gql';
import LiveIndicator from 'src/screens/competition-screen/heats-structure/live-indicator';

import TimetableEntry from './timetable-entry';

interface ITimetableRowProps {
  scheduleItem: TimetableScheduleItem;
  eventId: string;
  isAdmin: boolean;
  liveHeatId?: string;
}

const TimetableRow: React.FC<ITimetableRowProps> = ({ scheduleItem, eventId, isAdmin, liveHeatId }) => {
  const [open, setOpen] = useState(false);

  const [updateScheduleItem] = useUpdateScheduleItemMutation({
    refetchQueries: [
      {
        query: GET_EVENT_SCHEDULE,
        variables: { id: eventId },
      },
    ],
    awaitRefetchQueries: true,
  });

  const onUpdateScheduleItem = async (formValues: ITimetableFormValues): Promise<void> => {
    const result = await updateScheduleItem({ variables: { input: { id: scheduleItem.id, ...formValues } } });
    setOpen(false);
    return null;
  };

  const isLive = scheduleItem.scheduledItem.__typename === 'Round' && scheduleItem.scheduledItem.heats.items.find(({ id }) => liveHeatId === id);

  return (
    <>
      <Dialog open={open} setOpen={setOpen}>
        <TimetableForm
          title='Edit Timetable'
          onSubmit={onUpdateScheduleItem}
          initialValues={{ startTime: scheduleItem.startTime, notice: scheduleItem.notice }}
          onCancel={() => setOpen(false)}
          showNotice={!scheduleItem.scheduledItem}
          allowSubmitPristine={!scheduleItem.startTime}
        />
      </Dialog>
      {/* <Grid container spacing={1} style={{ padding: '8px 0 0', background: isLive ? '#17a3c312' : '' }}> */}
      <Grid container spacing={1} style={{ padding: '8px 0 0' }}>
        <Grid item xs={3} style={{ textAlign: 'center' }}>
          {isAdmin && (
            <Button color='primary' variant='contained' onClick={() => setOpen(true)} startIcon={<Edit />}>
              {scheduleItem.startTime ? DateFormatter.toTime(scheduleItem.startTime) : 'TBD'}
            </Button>
          )}
          {!isAdmin && (
            <Typography variant='h4' color='textPrimary' style={{ padding: '0 8px' }}>
              {DateFormatter.toTime(scheduleItem.startTime, isAdmin ? 'Select time...' : 'TBD')}
            </Typography>
          )}
          {isLive && (
            <div style={{ padding: '8px 0 0' }}>
              <LiveIndicator pulse />
            </div>
          )}
        </Grid>
        <Grid item xs={9}>
          {/* ToDo: Cleanup this props drilling */}
          <TimetableEntry scheduleItem={scheduleItem} key={scheduleItem.id} liveHeatId={liveHeatId} eventId={eventId} />
        </Grid>
      </Grid>
    </>
  );
};

export default TimetableRow;

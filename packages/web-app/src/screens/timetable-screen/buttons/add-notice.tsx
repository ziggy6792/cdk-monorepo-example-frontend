/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';

import _ from 'lodash';
import { Button } from '@material-ui/core';
import { Event } from '@material-ui/icons';

import { useCreateScheduleItemMutation } from 'src/generated-types';
import { GET_EVENT_SCHEDULE } from 'src/gql/queries/event.gql';
import Dialog from 'src/components/ui/dialog';
import TimetableForm from 'src/modules/forms/timetable-form';
import { ITimetableFormValues } from 'src/modules/forms/timetable-form/timetable-form';

interface IAddNoticeProps {
  eventId: string;
}

const AddNotice: React.FC<IAddNoticeProps> = ({ eventId }) => {
  const [open, setOpen] = useState(false);

  const [createScheduleItem] = useCreateScheduleItemMutation({
    refetchQueries: [
      {
        query: GET_EVENT_SCHEDULE,
        variables: { id: eventId },
      },
    ],
    awaitRefetchQueries: true,
  });

  const onCreateScheduleItem = async (formValues: ITimetableFormValues): Promise<void> => {
    await createScheduleItem({ variables: { input: { scheduleId: eventId, ...formValues } } });
    setOpen(false);
    return null;
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant='contained'
        color='primary'
        startIcon={<Event />}
      >
        Add Notice
      </Button>

      <Dialog open={open} setOpen={setOpen}>
        <TimetableForm title='Add Notice' onSubmit={onCreateScheduleItem} onCancel={() => setOpen(false)} showNotice />
      </Dialog>
    </>
  );
};

export default AddNotice;

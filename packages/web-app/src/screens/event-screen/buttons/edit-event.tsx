/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';

import _ from 'lodash';
import { Button, Grid, useTheme } from '@material-ui/core';

import { UpdateEventInput, useUpdateEventMutation } from 'src/generated-types';
import { GET_EVENT, LIST_EVENTS } from 'src/gql/queries/event.gql';
import Dialog from 'src/components/ui/dialog';
import EventForm from 'src/modules/forms/event-form';

interface IEditEventProps {
  eventToEdit: UpdateEventInput;
}

const EditEvent: React.FC<IEditEventProps> = ({ eventToEdit }) => {
  const { id } = eventToEdit;

  const theme = useTheme();

  const [updateEvent] = useUpdateEventMutation({
    refetchQueries: [
      {
        query: GET_EVENT,
        variables: { id },
      },
      {
        query: LIST_EVENTS,
      },
    ],
    awaitRefetchQueries: true,
  });

  const [open, setOpen] = useState(false);

  const onUpdateEvent = async (event: Omit<UpdateEventInput, 'id'>): Promise<void> => {
    await updateEvent({ variables: { input: { ...event, id } } });
    setOpen(false);
    return null;
  };

  return (
    <>
      <Grid container direction='row' justify='center'>
        <Grid item xs={12}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => {
              setOpen(true);
            }}
            style={{ width: '100%', padding: '8px 16px' }}
          >
            Edit Event
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} setOpen={setOpen}>
        <EventForm title='Edit Event' onSubmit={onUpdateEvent} onCancel={() => setOpen(false)} initialValues={eventToEdit} />
      </Dialog>
    </>
  );
};

export default EditEvent;

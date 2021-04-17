/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';

import _ from 'lodash';
import { Button, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons'; 

import { CreateEventInput, useCreateEventMutation } from 'src/generated-types';
import { LIST_EVENTS } from 'src/gql/queries/event.gql';
import Dialog from 'src/components/ui/dialog';
import EventForm from 'src/modules/forms/event-form';
import { useHistory } from 'react-router';
import { ROUTE_EVENT } from 'src/config/routes';


const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    padding: theme.spacing(2, 0, 4),
    textAlign: 'center'
  },
}));

const CreateEvent: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const [createEvent] = useCreateEventMutation({
    refetchQueries: [
      {
        query: LIST_EVENTS,
      },
    ],
    awaitRefetchQueries: true,
  });

  const [open, setOpen] = useState(false);

  const onCreateEvent = async (event: CreateEventInput): Promise<void> => {
    const result = await createEvent({ variables: { input: event } });
    setOpen(false);
    history.push(`${ROUTE_EVENT}/${result.data.createEvent.id}`);
    return null;
  };

  return (
    <>
      <div className={classes.buttonWrapper}>
        <Button
          color='primary'
          startIcon={<Add />}
          onClick={() => {
            setOpen(true);
          }}
          variant="contained"
        >
          Create New Event
        </Button>
      </div>
      <Dialog open={open} setOpen={setOpen}>
        <EventForm title='Create New Event' onSubmit={onCreateEvent} onCancel={() => setOpen(false)} />
      </Dialog>
    </>
  );
};

export default CreateEvent;

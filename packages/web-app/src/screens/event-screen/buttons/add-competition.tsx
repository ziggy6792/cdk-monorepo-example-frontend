/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';

import _ from 'lodash';
import { Button, Grid, useTheme } from '@material-ui/core';

import { useCreateCompetitionMutation } from 'src/generated-types';
import { GET_EVENT } from 'src/gql/queries/event.gql';
import Dialog from 'src/components/ui/dialog';
import { useHistory } from 'react-router';
import { ROUTE_COMPETITION_MANAGER } from 'src/config/routes';
import CompetitionForm, { ICompetitionFormValues } from 'src/modules/forms/competition-form';

interface IAddCompetitionProps {
  eventId: string;
}

const AddCompetition: React.FC<IAddCompetitionProps> = ({ eventId }) => {
  const theme = useTheme();

  const history = useHistory();

  const [createEvent] = useCreateCompetitionMutation({
    refetchQueries: [
      {
        query: GET_EVENT,
        variables: { id: eventId },
      },
    ],
    awaitRefetchQueries: true,
  });

  const [open, setOpen] = useState(false);

  const onCreateCompetition = async (competition: ICompetitionFormValues): Promise<void> => {
    const { judgeUser, maxRiders, ...rest } = competition;

    const variables = { input: { ...rest, eventId, maxRiders: +maxRiders, judgeUserId: judgeUser.id } };
    const result = await createEvent({ variables });
    setOpen(false);
    history.push(`${ROUTE_COMPETITION_MANAGER}/${result.data.createCompetition.id}`);
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
            Add Competition
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} setOpen={setOpen}>
        <CompetitionForm title='Add New Competition' onSubmit={onCreateCompetition} onCancel={() => setOpen(false)} />
      </Dialog>
    </>
  );
};

export default AddCompetition;

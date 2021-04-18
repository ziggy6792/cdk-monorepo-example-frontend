/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useAllocateRidersMutation } from 'src/generated-types';
import { GET_COMPETITION } from 'src/gql/queries/competition.gql';
import Dialog from 'src/components/ui/dialog';
import NotifyMessages, { NotifyMessageType } from 'src/modules/notify-messages/notify-messages';
import ConfirmBox from 'src/modules/confirm-box';

interface IEditCompetitionProps {
  competitionId: string;
  disabled?: boolean;
}

const AllocateRiders: React.FC<IEditCompetitionProps> = ({ competitionId, disabled }) => {
  const [allocateRiders] = useAllocateRidersMutation({
    refetchQueries: [
      {
        query: GET_COMPETITION,
        variables: { id: competitionId },
      },
    ],
    awaitRefetchQueries: true,
  });

  const onAllocateRiders = async (): Promise<void> => {
    const variables = { id: competitionId };
    await allocateRiders({ variables });
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} setOpen={setOpen}>
        <ConfirmBox
          title='Allocate Riders'
          confirmButton={{
            onClick: onAllocateRiders,
            text: 'Allocate Riders',
          }}
          cancelButton={{ onClick: () => setOpen(false) }}
        >
          <NotifyMessages
            notifyMessages={[
              {
                type: NotifyMessageType.WARN,
                message: 'This action will clear any existing competition results and reset the competition. Are you sure?',
              },
            ]}
          />
        </ConfirmBox>
      </Dialog>
      <Button variant='contained' color='primary' onClick={() => setOpen(true)} disabled={disabled}>
        Allocate Riders
      </Button>
    </>
  );
};

export default AllocateRiders;

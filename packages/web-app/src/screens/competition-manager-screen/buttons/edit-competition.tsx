/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button, useTheme } from '@material-ui/core';
import { UpdateCompetitionInput, useUpdateCompetitionMutation, User } from 'src/generated-types';
import Dialog from 'src/components/ui/dialog';
import { GET_COMPETITION } from 'src/gql/queries/competition.gql';
import ComepetitionForm, { ICompetitionFormValues } from 'src/modules/forms/competition-form';

interface IEditCompetitionProps {
  competitionToEdit: UpdateCompetitionInput;
  judgeUser: Pick<User, 'id' | 'fullName'>;
}

const EditCompetition: React.FC<IEditCompetitionProps> = ({ competitionToEdit, judgeUser }) => {
  const { id } = competitionToEdit;

  const theme = useTheme();

  const [updateCompetition] = useUpdateCompetitionMutation({
    refetchQueries: [
      {
        query: GET_COMPETITION,
        variables: { id },
      },
    ],
    awaitRefetchQueries: true,
  });

  const [open, setOpen] = useState(false);

  const onUpdateCompetition = async (competition: ICompetitionFormValues): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { judgeUser, maxRiders, ...rest } = competition;

    const variables = { input: { ...rest, id: competitionToEdit.id, maxRiders: +maxRiders, judgeUserId: judgeUser.id } };
    await updateCompetition({ variables });
    setOpen(false);
    return null;
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={open} setOpen={setOpen}>
        <ComepetitionForm
          title='Edit Competition'
          onSubmit={onUpdateCompetition}
          onCancel={() => setOpen(false)}
          initialValues={{ ...competitionToEdit, judgeUser }}
        />
      </Dialog>
    </>
  );
};

export default EditCompetition;

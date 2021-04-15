/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button, Grid, useTheme } from '@material-ui/core';
import { UpdateRiderAllocationInput, useUpdateRiderAllocationsMutation } from 'src/generated-types';
import Dialog from 'src/components/ui/dialog';
import SeedsForm, { ISeedsFormValues } from 'src/modules/forms/seeds-form';
import { IRiderOption } from 'src/gql/common/types';
import { GET_COMPETITION } from 'src/gql/queries/competition.gql';
import _ from 'lodash';

interface IEditSeedsProps {
  competitionId: string;
  riderAllocations: IRiderOption[];
  disabled?: boolean;
}

const EditSeeds: React.FC<IEditSeedsProps> = ({ riderAllocations, competitionId, disabled }) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const [updateRiderAllocations] = useUpdateRiderAllocationsMutation({
    refetchQueries: [
      {
        query: GET_COMPETITION,
        variables: { id: competitionId },
      },
    ],
    awaitRefetchQueries: true,
  });

  const onUpdateSeeds = async (formData: ISeedsFormValues): Promise<void> => {
    const { riders } = formData;
    const riderSortMap: { [key in string]: number } = {};
    riders.forEach((userId, i) => {
      riderSortMap[userId] = i;
    });
    const orderedRiderAllocations = _.orderBy(riderAllocations, (ra) => riderSortMap[ra.userId]);
    const updateRiderAllocationInputs: UpdateRiderAllocationInput[] = orderedRiderAllocations.map((riderOption, i) => ({
      allocatableId: competitionId,
      userId: riderOption.userId,
      startSeed: i + 1,
    }));
    await updateRiderAllocations({ variables: { input: updateRiderAllocationInputs } });
    setOpen(false);
    return null;
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        disabled={disabled}
      >
        Seed Order
      </Button>
      <Dialog open={open} setOpen={setOpen}>
        <SeedsForm
          title='Seeds Order'
          onSubmit={onUpdateSeeds}
          onCancel={() => setOpen(false)}
          initialValues={{ riders: riderAllocations.map(({ userId }) => userId) }}
          riderOptions={riderAllocations}
        />
      </Dialog>
    </>
  );
};

export default EditSeeds;

/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button, Grid, useTheme } from '@material-ui/core';
import { RiderAllocation, UpdateRiderAllocationInput, User, useUpdateRiderAllocationsMutation } from 'src/generated-types';
import Dialog from 'src/components/ui/dialog';
import SeedsForm from 'src/modules/seeds-form';
import { RiderOption } from 'src/gql/common/types';
import { GET_COMPETITION } from 'src/gql/competition.gql';
import { ISeedsFormValues } from 'src/modules/seeds-form/seeds-form';
import _ from 'lodash';

interface IEditSeedsProps {
    competitionId: string;
    riderAllocations: RiderOption[];
}

const EditSeeds: React.FC<IEditSeedsProps> = ({ riderAllocations, competitionId }) => {
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
            <Grid container direction='column'>
                <Grid container direction='row' justify='center' style={{ marginTop: theme.spacing(2) }}>
                    <Grid item>
                        <Button
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Seed Order
                        </Button>
                    </Grid>
                </Grid>
                <Dialog open={open} setOpen={setOpen}>
                    <SeedsForm
                        onSubmit={onUpdateSeeds}
                        title='Seeds Order'
                        onCancel={() => setOpen(false)}
                        initialValues={{ riders: riderAllocations.map(({ userId }) => userId) }}
                        riderOptions={riderAllocations}
                    />
                </Dialog>
            </Grid>
        </>
    );
};

export default EditSeeds;

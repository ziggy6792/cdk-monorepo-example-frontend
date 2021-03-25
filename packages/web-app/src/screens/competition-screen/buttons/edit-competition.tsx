/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button, Grid, useTheme } from '@material-ui/core';
import { UpdateCompetitionInput, useUpdateCompetitionMutation, User } from 'src/generated-types';
import { LIST_EVENTS } from 'src/gql/queries/event.gql';
import Dialog from 'src/components/ui/dialog';
import { GET_COMPETITION } from 'src/gql/queries/competition.gql';
import ComepetitionForm from 'src/modules/competition-form';
import { ICompetitionFormValues } from 'src/modules/competition-form/competition-form';

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
            {
                query: LIST_EVENTS,
            },
        ],
        awaitRefetchQueries: true,
    });

    const [open, setOpen] = useState(false);

    const onUpdateCompetition = async (competition: ICompetitionFormValues): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { judgeUser, maxRiders, ...rest } = competition;

        const variables = { input: { ...rest, id: competitionToEdit.id, maxRiders: +maxRiders, judgeUserId: judgeUser.id } };
        const result = await updateCompetition({ variables });
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
                            Edit
                        </Button>
                    </Grid>
                </Grid>
                <Dialog open={open} setOpen={setOpen}>
                    <ComepetitionForm
                        onSubmit={onUpdateCompetition}
                        title='Edit Competition'
                        onCancel={() => setOpen(false)}
                        initialValues={{ ...competitionToEdit, judgeUser }}
                    />
                </Dialog>
            </Grid>
        </>
    );
};

export default EditCompetition;

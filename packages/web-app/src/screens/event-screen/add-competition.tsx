/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';

import _ from 'lodash';
import { Button, Grid, useTheme } from '@material-ui/core';

import { CreateCompetitionInput, useCreateCompetitionMutation, User } from 'src/generated-types';
import { GET_EVENT, LIST_EVENTS } from 'src/gql/event.gql';
import Dialog from 'src/components/ui/dialog';
import { useHistory } from 'react-router';
import { ROUTE_EVENT } from 'src/config/routes';
import ComepetitionForm from 'src/modules/competition-form';
import { ICompetitionFormValues, IUserOption } from 'src/modules/competition-form/competition-form';

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
        console.log('variables', variables);
        const result = await createEvent({ variables });
        setOpen(false);
        // history.push(`${ROUTE_EVENT}/${result.data.createCompetition.id}`);
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
                            Add Competition
                        </Button>
                    </Grid>
                </Grid>
                <Dialog open={open} setOpen={setOpen}>
                    <ComepetitionForm onSubmit={onCreateCompetition} title='Add New Competition' onCancel={() => setOpen(false)} />
                </Dialog>
            </Grid>
        </>
    );
};

export default AddCompetition;

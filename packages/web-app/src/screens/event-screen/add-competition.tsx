/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';

import _ from 'lodash';
import { Button, Grid, useTheme } from '@material-ui/core';

import { CreateCompetitionInput, useCreateCompetitionMutation } from 'src/generated-types';
import { GET_EVENT, LIST_EVENTS } from 'src/gql/event.gql';
import Dialog from 'src/components/ui/dialog';
import { useHistory } from 'react-router';
import { ROUTE_EVENT } from 'src/config/routes';
import ComepetitionForm from 'src/modules/competition-form';

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

    const onCreateCompetition = async (competition: Omit<CreateCompetitionInput, 'eventId'>): Promise<void> => {
        const variables = { input: { ...competition, eventId } };
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

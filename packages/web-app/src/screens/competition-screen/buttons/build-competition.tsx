/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button, Grid, useTheme } from '@material-ui/core';
import { useUpdateRiderAllocationsMutation, CompetitionParams } from 'src/generated-types';
import Dialog from 'src/components/ui/dialog';
import SeedsForm from 'src/modules/seeds-form';
import { RiderOption } from 'src/gql/common/types';
import { GET_COMPETITION } from 'src/gql/queries/competition.gql';
import { ISeedsFormValues } from 'src/modules/seeds-form/seeds-form';
import _ from 'lodash';
import BuildCompetitionForm from 'src/modules/build-competition-form';
import YAML from 'yaml';
import defaultCompetition from 'src/gql/default-competition.json';

interface IBuildCompetitionProps {
    competitionId: string;
    riderAllocations: RiderOption[];
    params?: CompetitionParams;
}

const BuildCompetition: React.FC<IBuildCompetitionProps> = ({ riderAllocations, competitionId, params }) => {
    const ymlDocument = new YAML.Document();
    let allowSubmitPristine = false;
    if (params) {
        ymlDocument.contents = params;
    } else {
        allowSubmitPristine = true;
        ymlDocument.contents = defaultCompetition;
    }

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
                            Build
                        </Button>
                    </Grid>
                </Grid>
                <Dialog open={open} setOpen={setOpen}>
                    <BuildCompetitionForm
                        onSubmit={async formValues => console.log('formValues', formValues)}
                        title='Build Competition'
                        onCancel={() => setOpen(false)}
                        initialValues={{ params: ymlDocument.toString() }}
                    />
                </Dialog>
            </Grid>
        </>
    );
};

export default BuildCompetition;

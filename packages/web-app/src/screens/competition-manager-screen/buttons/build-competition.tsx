/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button, useTheme } from '@material-ui/core';
import { CompetitionParams, useBuildCompetitionMutation } from 'src/generated-types';
import Dialog from 'src/components/ui/dialog';
import { GET_COMPETITION } from 'src/gql/queries/competition.gql';
import _ from 'lodash';
import BuildCompetitionForm from 'src/modules/build-competition-form';
import YAML from 'yaml';
import defaultCompetition from 'src/gql/default-competition.json';
import { IBuildCompetitionFormValues } from 'src/modules/build-competition-form/build-competition-form';
import jsYaml from 'js-yaml';

interface IBuildCompetitionProps {
    competitionId: string;
    params?: CompetitionParams;
}

const BuildCompetition: React.FC<IBuildCompetitionProps> = ({ competitionId, params }) => {
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

    const [buildCompetition] = useBuildCompetitionMutation({
        refetchQueries: [
            {
                query: GET_COMPETITION,
                variables: { id: competitionId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const onSubmit = async (formData: IBuildCompetitionFormValues) => {
        const parsedParams = { rounds: jsYaml.load(formData.params) };
        await buildCompetition({
            variables: {
                id: competitionId,
                params: parsedParams,
            },
        });
        setOpen(false);
    };

    return (
        <>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                Build
            </Button>
            <Dialog open={open} setOpen={setOpen}>
                <BuildCompetitionForm
                    onSubmit={onSubmit}
                    title='Build Competition'
                    allowSubmitPristine={allowSubmitPristine}
                    onCancel={() => setOpen(false)}
                    initialValues={{ params: ymlDocument.toString() }}
                />
            </Dialog>
        </>
    );
};

export default BuildCompetition;

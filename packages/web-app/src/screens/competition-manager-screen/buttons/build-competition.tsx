/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button, useTheme } from '@material-ui/core';
import { CompetitionParams, useBuildCompetitionMutation } from 'src/generated-types';
import Dialog from 'src/components/ui/dialog';
import { GET_COMPETITION } from 'src/gql/queries/competition.gql';
import _ from 'lodash';
import YmlForm, { IYmlFormValues } from 'src/modules/forms/yml-form';
import YAML from 'yaml';
import defaultCompetition from 'src/gql/default-competition.json';
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

  const onSubmit = async (formData: IYmlFormValues) => {
    const parsedParams = { rounds: jsYaml.load(formData.ymlString) };
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
        <YmlForm
          onSubmit={onSubmit}
          title='Build Competition'
          allowSubmitPristine={allowSubmitPristine}
          onCancel={() => setOpen(false)}
          initialValues={{ ymlString: ymlDocument.toString() }}
          placeholder='Enter competition build params'
        />
      </Dialog>
    </>
  );
};

export default BuildCompetition;

/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { SignUpRiderInput, useSignUpCompetitionMutation } from 'src/generated-types';
import Dialog from 'src/components/ui/dialog';
import { GET_COMPETITION } from 'src/gql/queries/competition.gql';
import _ from 'lodash';
import YmlForm, { IYmlFormValues } from 'src/modules/forms/yml-form';
import jsYaml from 'js-yaml';

interface ISignUpRidersProps {
  competitionId: string;
  noOfRiders: number;
}

const buildDefaultStartList = (competitionSize: number): string =>
  _.range(0, competitionSize)
    .map((i) => `- [FirstName,LastName]`)
    .join('\n');

const SignUpRiders: React.FC<ISignUpRidersProps> = ({ competitionId, noOfRiders }) => {
  const allowSubmitPristine = true;

  const startListYml = buildDefaultStartList(noOfRiders);

  const [open, setOpen] = useState(false);

  const [signUpCompetition] = useSignUpCompetitionMutation({
    refetchQueries: [
      {
        query: GET_COMPETITION,
        variables: { id: competitionId },
      },
    ],
    awaitRefetchQueries: true,
  });

  const onSubmit = async (formData: IYmlFormValues) => {
    const parsedParams = jsYaml.load(formData.ymlString) as string[][];
    let riders: SignUpRiderInput[];
    try {
      riders = parsedParams
        ? parsedParams.map((values) => ({
            firstName: values[0],
            lastName: values[1],
          }))
        : [];
    } catch (err) {
      console.error(err);
    }

    await signUpCompetition({
      variables: {
        id: competitionId,
        riders,
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
        Sign Up Riders
      </Button>
      <Dialog open={open} setOpen={setOpen}>
        <YmlForm
          onSubmit={onSubmit}
          title='Sign Up Riders'
          allowSubmitPristine={allowSubmitPristine}
          onCancel={() => setOpen(false)}
          initialValues={{ ymlString: startListYml }}
          allowSubmitEmpty
        />
      </Dialog>
    </>
  );
};

export default SignUpRiders;

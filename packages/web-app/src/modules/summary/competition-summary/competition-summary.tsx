/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Competition, User } from 'src/generated-types';
import Summary from 'src/modules/summary/page-summary';

type CompSummary = Pick<Competition, 'name' | 'description'> & {
  judgeUser: Pick<User, 'fullName'>;
};

interface CompetitionSummaryProps {
  summary: CompSummary;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  judgeName: {
    fontWeight: 500,
  },
}));

const CompetitionSummary: React.FC<CompetitionSummaryProps> = ({ summary }) => {
  const classes = useStyles();

  return (
    <Summary name={summary.name} description={summary.description}>
      <Typography>
        Judged by <span className={classes.judgeName}>{summary.judgeUser?.fullName}</span>
      </Typography>
    </Summary>
  );
};

export default CompetitionSummary;

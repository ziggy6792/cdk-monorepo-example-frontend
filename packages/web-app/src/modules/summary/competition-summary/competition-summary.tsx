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
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  nameWrapper: {
    padding: theme.spacing(1, 1, 2),
    textTransform: 'none'
  }
}));

const CompetitionSummary: React.FC<CompetitionSummaryProps> = ({ summary }) => {
  const classes = useStyles();

  return (
    <Summary name={summary.name} description={summary.description}>
      <Typography color='textSecondary' variant='h6' component='div' className={classes.nameWrapper}>
        Judged by <span className={classes.judgeName}>{summary.judgeUser?.fullName}</span>
      </Typography>
    </Summary>
  );
};

export default CompetitionSummary;

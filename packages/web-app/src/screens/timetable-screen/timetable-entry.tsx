/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import { Grid, Link, useTheme, Typography, Button } from '@material-ui/core';
import { TimetableRound, TimetableScheduleItem } from 'src/gql/common/types';
import { useHistory } from 'react-router';
import { ROUTE_COMPETITION, ROUTE_HEAT } from 'src/config/routes';

interface TimetableEntryProps {
  scheduleItem: TimetableScheduleItem;
}

const TimetableEntry: React.FC<TimetableEntryProps> = ({ scheduleItem }) => {
  const { notice, scheduledItem } = scheduleItem;
  return (
    <>
      {scheduledItem?.__typename === 'Round' && <TimetableRoundEntry round={scheduledItem} />}
      {notice && <TimetableNoticeEntry notice={notice} />}
    </>
  );
};

interface TimetableNoticeEntryProps {
  notice: string;
}

const TimetableNoticeEntry: React.FC<TimetableNoticeEntryProps> = ({ notice }) => (
  <Grid item xs={12}>
    <Typography variant='h4' color='textPrimary' style={{ padding: '0 0 16px', textTransform: 'none' }}>
      {notice}
    </Typography>
  </Grid>
);

interface TimetableRoundEntryProps {
  round: TimetableRound;
}

const TimetableRoundEntry: React.FC<TimetableRoundEntryProps> = ({ round }) => {
  const theme = useTheme();

  const history = useHistory();

  return (
    <>
      <Grid item>
        <Typography
          variant='h4'
          onClick={() => {
            history.push(`${ROUTE_COMPETITION}/${round.competition.id}`);
          }}
          style={{ cursor: 'pointer' }}
        >
          {round.longName}
        </Typography>
      </Grid>
      <Grid container direction='row' spacing={1} style={{ padding: theme.spacing(1, 1, 2, 0.5) }}>
        {round.heats.items.map((heat) => (
          <Grid item key={heat.name}>
            <Button
              variant='contained'
              onClick={() => {
                history.push(`${ROUTE_HEAT}/${heat.id}`);
              }}
            >
              {heat.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TimetableEntry;

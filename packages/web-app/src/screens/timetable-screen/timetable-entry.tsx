/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import { Grid, useTheme, Typography, Button } from '@material-ui/core';
import { LabelImportant, FiberManualRecord } from '@material-ui/icons';
import { TimetableRound, TimetableScheduleItem } from 'src/gql/common/types';
import LiveIndicator from 'src/screens/competition-screen/heats-structure/live-indicator';

import { useHistory } from 'react-router';
import { ROUTE_COMPETITION, ROUTE_HEAT } from 'src/config/routes';

interface TimetableEntryProps {
  scheduleItem: TimetableScheduleItem;
}

const TimetableEntry: React.FC<TimetableEntryProps> = ({ scheduleItem }) => {
  const { notice, scheduledItem } = scheduleItem;
  return (
    <>
      {scheduledItem?.__typename === 'Round' && <TimetableRoundEntry round={scheduledItem} isLive />}
      {notice && <TimetableNoticeEntry notice={notice} />}
    </>
  );
};

interface TimetableNoticeEntryProps {
  notice: string;
}

const TimetableNoticeEntry: React.FC<TimetableNoticeEntryProps> = ({ notice }) => (
  <Grid item xs={12}>
    <Typography variant='h4' color='textPrimary' style={{ padding: '0 4px 16px 0', textTransform: 'none', lineHeight: 1 }}>
      {notice}
    </Typography>
  </Grid>
);

interface TimetableRoundEntryProps {
  round: TimetableRound;
  isLive: boolean
}

const TimetableRoundEntry: React.FC<TimetableRoundEntryProps> = ({ round, isLive }) => {
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
          style={{ cursor: 'pointer', lineHeight: 1 }}
        >
          {round.longName}
        </Typography>
      </Grid>
      <Grid container direction='row' spacing={1} style={{ padding: theme.spacing(1, 1, 2, 0.5) }}>
        {round.heats.items.map((heat) => (
          <Grid item key={heat.name}>
            <Button
              startIcon={isLive ? 
                <FiberManualRecord style={{ color: '#e74c3c'}}/> : <LabelImportant />}
              color='default'
              variant='contained'
              onClick={() => {
                history.push(`${ROUTE_HEAT}/${heat.id}`);
              }}
              style={{
                border: '2px solid white',
                background: isLive ? 'white' : '#e0e0e0'
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

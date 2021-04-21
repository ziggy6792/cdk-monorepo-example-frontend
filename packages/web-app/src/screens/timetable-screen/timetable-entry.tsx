/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import { Grid, useTheme, Typography, Button } from '@material-ui/core';
import { LabelImportant } from '@material-ui/icons';
import { TimetableRound, TimetableScheduleItem } from 'src/gql/common/types';

import { useHistory } from 'react-router';
import { ROUTE_COMPETITION, ROUTE_HEAT, ROUTE_LIVE } from 'src/config/routes';

interface TimetableEntryProps {
  liveHeatId?: string;
  eventId: string;
  scheduleItem: TimetableScheduleItem;
}

const TimetableEntry: React.FC<TimetableEntryProps> = ({ scheduleItem, liveHeatId, eventId }) => {
  const { notice, scheduledItem } = scheduleItem;
  return (
    <>
      {scheduledItem?.__typename === 'Round' && <TimetableRoundEntry round={scheduledItem} liveHeatId={liveHeatId} eventId={eventId} />}
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
  liveHeatId?: string;
  eventId: string;
}

const TimetableRoundEntry: React.FC<TimetableRoundEntryProps> = ({ round, liveHeatId, eventId }) => {
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
        {round.heats.items.map((heat) => {
          const isLive = liveHeatId === heat.id;
          return (
            <Grid item key={heat.name}>
              <Button
                // startIcon={isHeatLive(heat.status) ? <FiberManualRecord style={{ color: '#e74c3c' }} /> : <LabelImportant />}
                startIcon={<LabelImportant />}
                color='default'
                variant='contained'
                onClick={() => {
                  history.push(isLive ? `${ROUTE_LIVE}/${eventId}` : `${ROUTE_HEAT}/${heat.id}`);
                }}
                style={{
                  border: '2px solid white',
                  background: isLive ? 'white' : '#e0e0e0',
                }}
              >
                {heat.name}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default TimetableEntry;

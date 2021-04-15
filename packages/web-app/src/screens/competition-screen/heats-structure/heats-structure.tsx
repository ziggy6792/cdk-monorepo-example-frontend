import React, { Fragment } from 'react';
import { Grid, Container, makeStyles, Typography, useTheme } from '@material-ui/core';
import TrophyIcon from '@material-ui/icons/EmojiEvents';
import { Heat, Round, Maybe, User, HeatStatus } from 'src/generated-types';
import _ from 'lodash';
import { parseISO, startOfDay } from 'date-fns';
import DateFormatter from 'src/utils/format/date-formatter';
import { useHistory } from 'react-router';
import { ROUTE_HEAT, ROUTE_SCOREBOARD } from 'src/config/routes';
import HeatCard, { HeatCardStatus } from './heat-card';

const useStyles = makeStyles(() => ({
  container: {},
  dateHeader: {
    background: '#17a2b8',
    color: 'white',
    padding: '0 12px',
    margin: '12px 0 8px',
    borderRadius: 20,
    width: 'fit-content',
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '2px',
  },
}));

interface IDateHeaderProps {
  header: string;
}

const DateHeader: React.FC<IDateHeaderProps> = ({ header }) => {
  const classes = useStyles();
  return (
    <Typography component='div' className={classes.dateHeader}>
      {header}
    </Typography>
  );
};

type HeatsStructureRound = Pick<Round, 'id' | 'startTime' | 'name'> & {
  heats: { __typename?: 'HeatList' } & {
    items: Array<
      { __typename?: 'Heat' } & Pick<Heat, 'id' | 'isFinal' | 'name' | 'size' | 'noAllocated' | 'createdAt' | 'status'> & {
          round: Pick<Round, 'roundNo'>;
          riderAllocations: {
            items: Array<{ user: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'fullName'>> }>;
          };
        }
    >;
  };
};

const statusLookup = {
  [HeatStatus.NotReady]: HeatCardStatus.NOT_STARTED,
  [HeatStatus.InProgress]: HeatCardStatus.IN_PROGRESS,
  [HeatStatus.Finished]: HeatCardStatus.READY_OR_FINISHED,
  [HeatStatus.Ready]: HeatCardStatus.READY_OR_FINISHED,
};

interface IHeatsStructureProps {
  rounds: HeatsStructureRound[];
  eventId: string;
}

const HeatsStructure: React.FC<IHeatsStructureProps> = ({ rounds, eventId }) => {
  const groupedItems = _.groupBy(rounds, (round) => (round.startTime ? startOfDay(round.startTime).toISOString() : new Date(0).toISOString()));

  const roundsByDay = Object.keys(groupedItems).map((key) => ({
    day: key === new Date(0).toISOString() ? null : parseISO(key),
    dayRounds: groupedItems[key] as HeatsStructureRound[],
  }));

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  return (
    <Container className={classes.container}>
      {roundsByDay.map(({ day, dayRounds }) => (
        <Grid item key={day ? day.toISOString() : 'TBD'}>
          <DateHeader header={day ? DateFormatter.toLongDay(day) : 'Date TBD'} />
          {dayRounds.map((round) => (
            <Fragment key={round.id}>
              <Grid container justify='flex-start' style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1), marginLeft: theme.spacing(2) }}>
                <Grid item>
                  <Typography>{round.name}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} justify='center'>
                {round.heats.items.map((heat) => (
                  <Grid item key={heat.id}>
                    <HeatCard
                      onClick={() => {
                        if (heat.status === HeatStatus.InProgress) {
                          history.push(`${ROUTE_SCOREBOARD}/${eventId}`);
                        } else {
                          history.push(`${ROUTE_HEAT}/${heat.id}`);
                        }
                      }}
                      title={
                        heat.isFinal ? (
                          <>
                            <TrophyIcon style={{ color: '#f1c40f' }} />
                            {heat.name}
                          </>
                        ) : (
                          heat.name
                        )
                      }
                      width={heat.isFinal ? 260 : undefined}
                      status={statusLookup[heat.status]}
                      content={
                        <>
                          {heat.riderAllocations.items.map((ra) => (
                            <li key={ra.user?.fullName}>{ra.user?.fullName}</li>
                          ))}
                        </>
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Fragment>
          ))}
        </Grid>
      ))}

      {/* <>
                <DateHeader header='SATURDAY, AUGUST 8' />
                <Grid container spacing={2} justify='center'>
                    <Grid item>
                        <HeatCard
                            title='Heats #1'
                            status={HeatCardStatus.FINISHED}
                            content={
                                <>
                                    <li>Jonathan</li>
                                    <li>Cyril</li>
                                    <li>Lolo</li>
                                    <li>Baron</li>
                                    <li>Kimmy</li>
                                </>
                            }
                        />
                    </Grid>
                    <Grid item>
                        <HeatCard title='Heats #2' status={HeatCardStatus.FINISHED} />
                    </Grid>
                    <Grid item>
                        <HeatCard title='Heats #3' status={HeatCardStatus.IN_PROGRESS} />
                    </Grid>
                    <Grid item>
                        <HeatCard title='Heats #4' />
                    </Grid>
                </Grid>
                <DateHeader header='SUNDAY, AUGUST 9' />
                <Grid container spacing={2} justify='center'>
                    <Grid item>
                        <HeatCard title='LCQ #1' />
                    </Grid>
                    <Grid item>
                        <HeatCard title='LCQ #2' />
                    </Grid>
                </Grid>
                <Grid container spacing={2} justify='center'>
                    <Grid item>
                        <HeatCard title='Semi #1' width={120} />
                    </Grid>
                    <Grid item>
                        <HeatCard title='Semi #2' width={120} />
                    </Grid>
                </Grid>
                <Grid container spacing={1} justify='center' style={{ paddingTop: 8 }}>
                    <Grid item>
                        <HeatCard
                            title={
                                <>
                                    <TrophyIcon style={{ color: '#f1c40f' }} />
                                    Finals
                                </>
                            }
                            width={260}
                        />
                    </Grid>
                </Grid>
            </> */}
    </Container>
  );
};

export default HeatsStructure;

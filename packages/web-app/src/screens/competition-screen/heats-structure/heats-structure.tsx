import React, { Fragment } from 'react';
import { Grid, Container, makeStyles, Typography, useTheme } from '@material-ui/core';
import TrophyIcon from '@material-ui/icons/EmojiEvents';
import { Heat, Round, Maybe, User, HeatStatus } from 'src/generated-types';
import _ from 'lodash';
import { parseISO, startOfDay } from 'date-fns';
import DateFormatter from 'src/utils/format/date-formatter';
import { useHistory } from 'react-router';
import { ROUTE_HEAT, ROUTE_LIVE } from 'src/config/routes';
import HeatCard, { HeatCardStatus } from './heat-card';

const useStyles = makeStyles((theme) => ({
  container: {},
  dateHeader: {
    color: theme.palette.primary.main,
    width: 'fit-content',
    letterSpacing: '2px',
    padding: theme.spacing(2,0,0)
  },
  roundHeader: {
    backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.main}cc)`,
    color: 'white',
    padding: theme.spacing(1,2,1,5),
    margin: theme.spacing(2,0,0,-6),
    width: 'fit-content',
    letterSpacing: '2px',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
}));

interface IDateHeaderProps {
  header: string;
}

const DateHeader: React.FC<IDateHeaderProps> = ({ header }) => {
  const classes = useStyles();
  return (
    <Typography component='div' variant='h4' className={classes.dateHeader}>
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
          {day && <DateHeader header={DateFormatter.toLongDay(day, 'TBD')} />}
          {dayRounds.map((round) => (
            <Fragment key={round.id}>
              <Grid
                container
                justify='flex-start'
                style={{ 
                  margin: theme.spacing(1,0,1,2),
                }}
              >
                <Grid item>
                  <Typography
                    component='div'
                    variant='h4'
                    className={classes.roundHeader}
                  >
                    {round.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} justify='center'>
                {round.heats.items.map((heat) => (
                  <Grid item key={heat.id}>
                    <HeatCard
                      onClick={() => {
                        if (heat.status === HeatStatus.InProgress) {
                          history.push(`${ROUTE_LIVE}/${eventId}`);
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
                      width={210}
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
    </Container>
  );
};

export default HeatsStructure;

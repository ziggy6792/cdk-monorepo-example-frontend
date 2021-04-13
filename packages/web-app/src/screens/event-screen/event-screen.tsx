import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Button, Grid, Typography, Container } from '@material-ui/core';
import { useGetEventQuery } from 'src/generated-types';
import TopNavigation from 'src/components/ui/top-navigation';
import FabMenu from 'src/components/ui/fab-menu';
import Spinner from 'src/components/spinner';
import { useHistory } from 'react-router';
import { ROUTE_SCOREBOARD, ROUTE_TIMETABLE } from 'src/config/routes';
import CompetitionsTable from './competitions-table';
import EditEvent from './buttons/edit-event';
import AddCompetition from './buttons/add-competition';

interface IEventsScreenProps {
  eventId: string;
}

const useStyles = makeStyles(theme => ({
  tableCtaButtons: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      marginTop: 0,
      justifyContent: 'flex-end',
    },
  },
}));

const EventScreen: React.FC<IEventsScreenProps> = ({ eventId }) => {
  const classes = useStyles();
  const { loading, data } = useGetEventQuery({ variables: { id: eventId } });

  const history = useHistory();

  if (loading) {
    return <Spinner />;
  }

  const {
    name,
    description,
    adminUser: { fullName: adminName },
    startTime,
  } = data.getEvent;

  /* 
    TODO
    - TopNavigation should be made more complex and moved up a layer in UI
    - Edit Event / Add Comp logic should not be so tightly coupled to button
    */

  return (
    <>
      <TopNavigation />

      <Container>
        <Grid container direction='column'>
          <Grid item style={{ marginTop: 20, marginBottom: 15 }}>
            <Typography variant='h5'>PLACEHOLDER - BREADCRUMS</Typography>
          </Grid>
          <Grid item>
            {/* <Typography>
                            Event {name} hosted by {adminName}
                        </Typography> */}
            <Typography align='left' variant='h3'>
              {name}
            </Typography>
            <Typography align='left' variant='h5'>
              {adminName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: 12 }} variant='body2' color='textPrimary'>
              {description}
            </Typography>
          </Grid>
          <Grid container className={classes.tableCtaButtons} spacing={2}>
            <Grid item>
              {/* Find a Trophy Icon */}
              <Button
                color='primary'
                variant='contained'
                startIcon={<LocalCafeIcon />}
                onClick={() => {
                  history.push(`${ROUTE_SCOREBOARD}/${eventId}`);
                }}
              >
                Scoreboard
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                startIcon={<ScheduleIcon />}
                onClick={() => {
                  history.push(`${ROUTE_TIMETABLE}/${eventId}`);
                }}
              >
                Timetable
              </Button>
            </Grid>
          </Grid>

          <Container maxWidth='lg' style={{ padding: 0 }}>
            <CompetitionsTable competitions={data.getEvent.competitions.items} />
          </Container>
        </Grid>
        {/* FAB Menu will be rendered based on UAC role */}
        <FabMenu>
          <FabMenu.Item>
            <AddCompetition eventId={eventId} />
          </FabMenu.Item>
          <FabMenu.Item>
            <EditEvent
              eventToEdit={{
                id: eventId,
                description,
                name,
                startTime,
              }}
            />
          </FabMenu.Item>
        </FabMenu>
      </Container>
    </>
  );
};

export default EventScreen;

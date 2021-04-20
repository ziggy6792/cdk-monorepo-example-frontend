import React from 'react';
import { useHistory } from 'react-router';
import { Grid, Typography, CardContent, makeStyles } from '@material-ui/core';
import { useGetEventQuery } from 'src/generated-types';
import ScreenWrapper from 'src/components/ui/screen-wrapper';
import FabMenu from 'src/components/ui/fab-menu';
import Spinner from 'src/components/spinner';

import eventBanner from 'src/organiser-header.jpg';
import sponsors from 'src/all-sponsors.jpg';
// import sponsor1 from 'src/sponsor-embily.jpg';
// import sponsor2 from 'src/sponsor-swp.png';
// import sponsor3 from 'src/sponsor-mystic.png';
// import sponsor4 from 'src/sponsor-slingshot.jpg';
// import sponsor5 from 'src/sponsor-777.png';

import CompetitionsTable from './competitions-table';
import EditEvent from './buttons/edit-event';
import AddCompetition from './buttons/add-competition';

interface IEventsScreenProps {
  eventId: string;
}

const useStyles = makeStyles((theme) => ({
  description: {
    fontSize: '1rem',
  },
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

// const DESCRIPTION = `Welcome to #back2basics2021 at Singapore Wakepark.
// Please take note of the timings for each respective category.
// Do note that there has been a change in timing for the Men’s Intermediate Wakeboard and
// Women’s Wakeboard Open categories.
// Due to social distancing measures, only riders are allowed in the ski area only during
// their respective time slots and must leave after their event has completed. Prize-giving
// for each category will also be done immediately after each respective category’s Final round.
// No spectators are allowed within the ski zone at all times and we encourage everyone to
// view the event through live-streaming which will be available on our Facebook page
// at https://www.facebook.com/singaporewba/.`;

const EventScreen: React.FC<IEventsScreenProps> = ({ eventId }) => {
  const classes = useStyles();
  const { data } = useGetEventQuery({ variables: { id: eventId } });

  /* 
    TODO
    - TopNavigation should be made more complex and moved up a layer in UI
    - Edit Event / Add Comp logic should not be so tightly coupled to button
    */

  const { name, description, startTime } = data?.getEvent || {};

  return (
    <Grid container direction='column' justify='center' style={{ maxWidth: '100vw' }}>
      <ScreenWrapper eventTitle={name} eventId={eventId} currentPath='overall' showSpinner={!data}>
        {data && (
          <>
            <Grid container direction='column'>
              <Grid item style={{ textAlign: 'center', margin: '16px 0', background: 'white', padding: '16px 0' }}>
                <img
                  src={eventBanner}
                  alt='event banner'
                  style={{ 
                    width: '90vw',
                    maxWidth: 500,
                  }}
                />
              </Grid>
              <Grid item>
                <CardContent>
                  <Typography variant='h3' color='primary'>
                    Event Description
                  </Typography>
                  <br />
                  <Typography className={classes.description} variant='body2' color='textPrimary'>
                    {description}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item>
                <CardContent>
                  <Typography variant='h3' color='primary'>
                    Competitions
                  </Typography>
                </CardContent>
              </Grid>
              {!data.getEvent.competitions.items.length && (
                <Grid item style={{ textAlign: 'center', background: '#ccc', padding: 16, margin: '0 16px' }}>
                  <Typography variant='subtitle2' color='textSecondary'>
                    Competitions coming soon!
                  </Typography>
                </Grid>
              )}
              <Grid item style={{ maxWidth: '100vw'}}>
                <CompetitionsTable competitions={data.getEvent.competitions.items} />
              </Grid>
              <br />
              <Grid item>
                <CardContent>
                  <Typography variant='h3' color='primary'>
                    Thanks to
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item>
                <Grid
                  container
                  spacing={1}
                  justify='space-around'
                  style={{ padding: '8px 0', background: 'white' }}
                >
                  <Grid item>
                    <img src={sponsors} alt='wba' style={{ width: '90vw', maxWidth: 500 }} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* FAB Menu will be rendered based on UAC role */}
            {data.getEvent.isAdmin && (
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
            )}
          </>
        )}
      </ScreenWrapper>
    </Grid>
  );
};

export default EventScreen;

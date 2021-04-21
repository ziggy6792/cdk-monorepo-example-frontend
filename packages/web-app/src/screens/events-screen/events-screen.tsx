/* eslint-disable no-underscore-dangle */
import { Typography, Grid, CardContent } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'src/components/spinner';
import authSelectors from 'src/domain/auth/selectors';
import AlpacaIcon from 'src/Alpaca.svg';
import { useListEventsQuery } from 'src/generated-types';
import CreateEvent from './buttons/create-event';
import EventCard from './event-card';

const EventsScreen: React.FC = () => {
  const { data } = useListEventsQuery();
  const isAuthenticated = useSelector(authSelectors.selectIsAuthenticated);

  return (
    <>
      <Typography variant='h3' style={{ textAlign: 'center', padding: '48px 16px 24px', color: '#297b92' }}>
        <img src={AlpacaIcon} alt='alpaca' style={{ width: 80 }} /><br />
        Welcome to Alpaca!
      </Typography>
      {!data && <Spinner />}
      {data && (
        <CardContent>
          {isAuthenticated && (
            <Grid item>
              <CreateEvent />
            </Grid>
          )}
          <Grid container spacing={3} justify='center'>
            {data.listEvents.map((event) => {
              console.log(event);
              return (
                <Grid item xs={12} md={6} lg={4} key={event.id}>
                  <EventCard event={event} />
                </Grid>
              );
            })}
            <Grid item xs={12} md={6} lg={4}>
              <CardContent>
                <Typography variant='h4' style={{ textAlign: 'right', textTransform: 'none', color: '#297b92' }}>
                  ... more events coming soon!
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardContent>
      )}
    </>
  );
};

export default EventsScreen;

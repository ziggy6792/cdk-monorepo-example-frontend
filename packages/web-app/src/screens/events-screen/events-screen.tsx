/* eslint-disable no-underscore-dangle */
import { Card, Typography, Grid, CardContent } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'src/components/spinner';
import authSelectors from 'src/domain/auth/selectors';
import { useListEventsQuery } from 'src/generated-types';
import CreateEvent from './buttons/create-event';
import EventsTable from './events-table';
import EventCard from './event-card';

const EventsScreen: React.FC = () => {
  const { loading, data } = useListEventsQuery();
  const isAuthenticated = useSelector(authSelectors.selectIsAuthenticated);

  console.log('Events Screen')
  console.log(data);

  return (
    <>
      <Typography variant='h3' style={{ textAlign: 'center', padding: '48px 16px 24px', color: '#297b92' }}>
        Welcome to Alpaca!
      </Typography>
      {loading && <Spinner />}
      {!loading && (
        <CardContent>
          {isAuthenticated && (
            <Grid item>
              <CreateEvent />
            </Grid>
          )}
          <Grid container spacing={3}>
            {data.listEvents.map(event => {
              console.log(event)
              return (
                <Grid item xs={12} md={6} lg={4} key={event.id}>
                  <EventCard event={event}/>
                </Grid>
            )})}
            <Grid item xs={12} md={6} lg={4}>
              <CardContent>
                <Typography variant='h4' style={{ textAlign: 'right', textTransform: 'none', color: '#297b92' }}>... more events coming soon!</Typography>
              </CardContent>
            </Grid>
          </Grid>  
        </CardContent>
        
      )}
    </>
  );
};

export default EventsScreen;

/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Button, Grid, Typography, makeStyles } from '@material-ui/core';
import { ExitToApp, ViewList } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutActionCreator } from 'src/domain/auth';
import Spinner from 'src/components/spinner';
import Buttons from 'src/modules/forms/login-form/buttons';
import LoginForm from 'src/modules/forms/login-form';
import ScreenWrapper from 'src/components/ui/screen-wrapper';

import authSelectors from 'src/domain/auth/selectors';
import { useHistory } from 'react-router-dom';
import * as routeConfig from 'src/config/routes';

export const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1.5,2.5),
    width: 240
  },
}));


interface ProfileScreenProps {
  eventId?: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ eventId }) => {
  const classes = useStyles();
  const [formState, setFormSate] = useState('base');

  const dispatch = useDispatch();

  const user = useSelector(authSelectors.selectUser);
  const isLoading = useSelector(authSelectors.selectIsLoading);
  const isAuthenticated = useSelector(authSelectors.selectIsAuthenticated);

  const history = useHistory();

  if (isLoading) {
    return <Spinner />;
  }

  const Content = () => (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      style={{ height: '70vh', width: '100%' }}
      spacing={2}
    >
      <Grid item>
        {!isAuthenticated && (
          <>
            {formState === 'email' && <LoginForm />}
            {formState === 'base' && <Buttons updateFormState={setFormSate} />}
          </>
        )}
      </Grid> 
      {isAuthenticated && (
        <>
          <Grid item>
            <Typography variant="h4">Welcome {user.displayName}</Typography>
          </Grid>
          <Grid item>
            <Button
              startIcon={<ExitToApp />}
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={() => dispatch(logoutActionCreator())}
            >
              sign out
            </Button>
          </Grid>
        </>
      )}
      <Grid item>
        <Button 
          startIcon={<ViewList />}
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={() => history.push(routeConfig.ROUTE_EVENTS)}
        >
          View All Events
        </Button>
      </Grid>
    </Grid>
  )

  if(eventId){
    return (
      <ScreenWrapper eventTitle='' eventId={eventId} currentPath='profile'>
        <Content />
      </ScreenWrapper>
    );
  }

  return <Content />
};

export default ProfileScreen;

/* eslint-disable react/button-has-type */
import React, { useEffect, useState, Fragment, Component } from 'react';

import { Auth, Hub } from 'aws-amplify';

import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutActionCreator } from 'src/domain/auth';
import Logger from 'js-logger';
import Spinner from '../../components/spinner';
import Buttons from '../../modules/login-form/Buttons';
import LoginForm from '../../modules/login-form';

import * as authSelectors from '../../domain/auth/selectors';

const ProfileScreen: React.FC = () => {
  const [formState, setFormSate] = useState('base');

  const dispatch = useDispatch();

  const user = useSelector(authSelectors.selectUser);
  const isLoading = useSelector(authSelectors.selectIsLoading);
  const isAuthenticated = useSelector(authSelectors.selectIsAuthenticated);

  // Logger.info('auth state', state);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await Auth.currentCredentials();
      console.log('credentials', response);
      // ...
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {!isAuthenticated && (
        <>
          {formState === 'email' && <LoginForm />}
          {formState === 'base' && <Buttons updateFormState={setFormSate} />}
        </>
      )}

      {isAuthenticated && (
        <>
          <>
            <h4>Welcome {user.displayName}</h4>
            <Button onClick={() => dispatch(logoutActionCreator())}>sign out</Button>
          </>
        </>
      )}
    </>
  );
};

export default ProfileScreen;

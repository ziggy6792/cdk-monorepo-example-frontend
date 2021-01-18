/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutActionCreator } from 'src/domain/auth';
import Spinner from 'src/components/spinner';
import Buttons from 'src/modules/login-form/buttons';
import LoginForm from 'src/modules/login-form';

import * as authSelectors from 'src/domain/auth/selectors';

const ProfileScreen: React.FC = () => {
  const [formState, setFormSate] = useState('base');

  const dispatch = useDispatch();

  const user = useSelector(authSelectors.selectUser);
  const isLoading = useSelector(authSelectors.selectIsLoading);
  const isAuthenticated = useSelector(authSelectors.selectIsAuthenticated);

  // Logger.info('auth state', state);
  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await Auth.currentCredentials();
  //     console.log('credentials', response);
  //     // ...
  //   }
  //   fetchData();
  // }, []);

  console.log('isLoading', isLoading);

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

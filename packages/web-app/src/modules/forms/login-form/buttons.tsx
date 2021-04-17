/* eslint-disable react/button-has-type */
import React from 'react';

import { Button, Grid } from '@material-ui/core';
import { Email, Facebook } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { USER_TYPE } from 'src/domain/auth/user';
import { loginActionCreator } from 'src/domain/auth';

interface IButtonsProps {
  updateFormState: (formState: string) => void;
}

const Buttons: React.FC<IButtonsProps> = ({ updateFormState }) => {
  const dispatch = useDispatch();

  return (
    <Grid container spacing={2} justify='center' alignItems='center' style={{ height: '100%', padding: 40 }}>
      <Grid item xs={12}>
        <Button 
          variant='contained' 
          style={{ width: '100%', height: 40 }} 
          color='primary' 
          endIcon={<Facebook />} 
          onClick={() => dispatch(loginActionCreator({ type: USER_TYPE.FACEBOOK }))}
        >
          Facebook
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='contained'
          style={{ width: '100%', height: 40 }}
          color='primary' endIcon={<Email />}
          onClick={() => updateFormState('email')}
        >
          Sign in with Email
        </Button>
      </Grid>
    </Grid>
  );
};

export default Buttons;

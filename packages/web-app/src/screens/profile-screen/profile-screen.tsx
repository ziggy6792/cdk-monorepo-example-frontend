/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutActionCreator } from 'src/domain/auth';
import Spinner from 'src/components/spinner';
import Buttons from 'src/modules/login-form/buttons';
import LoginForm from 'src/modules/login-form';

import authSelectors from 'src/domain/auth/selectors';
import { useHistory } from 'react-router-dom';
import * as routeConfig from 'src/config/routes';

const ProfileScreen: React.FC = () => {
    const [formState, setFormSate] = useState('base');

    const dispatch = useDispatch();

    const user = useSelector(authSelectors.selectUser);
    const isLoading = useSelector(authSelectors.selectIsLoading);
    const isAuthenticated = useSelector(authSelectors.selectIsAuthenticated);

    const history = useHistory();

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Grid container direction='column' justify='center' alignItems='center' style={{ height: '100%', width: '100%' }}>
            <Grid item>
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
            </Grid>
            <Grid item>
                <Button onClick={() => history.push(routeConfig.ROUTE_HOME)}>Book a slot</Button>
            </Grid>
        </Grid>
    );
};

export default ProfileScreen;

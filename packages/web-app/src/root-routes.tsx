import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { isAuthenticatedActionCreator } from 'src/domain/auth';
import * as routeConfig from 'src/config/routes';
import HomeScreen from 'src/screens/home-screen';
import LoginScreen from 'src/screens/login-screen';
import ProfileScreen from 'src/screens/profile-screen';
import ProtectedRoute from './hoc/protected-route/index';
import envConfig from './config/env-config';
// Solution from https://dev.to/admitkard/mobile-issue-with-100vh-height-100-100vh-3-solutions-3nae
const calcVh = () => {
    (document.querySelector(':root') as any).style.setProperty('--vh', `${window.innerHeight / 100}px`);
};

calcVh();
window.addEventListener('resize', () => {
    calcVh();
});

document.title = envConfig.title;

const Routes: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isAuthenticatedActionCreator());
    }, [dispatch]);

    return (
        <div style={{ height: 'calc(100 * var(--vh))', width: '100%' }}>
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={LoginScreen} />
                    <ProtectedRoute isAuthenticated exact path={routeConfig.ROUTE_HOME} component={HomeScreen} />
                    <ProtectedRoute isAuthenticated exact path={routeConfig.ROUTE_PROFILE} component={ProfileScreen} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default Routes;

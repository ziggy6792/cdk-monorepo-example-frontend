import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isAuthenticatedActionCreator } from 'src/domain/auth';
import Theme from 'src/ui/theme';
import * as routeConfig from 'src/config/routes';
import HomeScreen from 'src/screens/home-screen';
import ProfileScreen from 'src/screens/profile-screen';
import EventsScreen from 'src/screens/events-screen';

const Routes: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isAuthenticatedActionCreator());
    }, [dispatch]);

    return (
        <ThemeProvider theme={Theme}>
            <BrowserRouter>
                <Route exact path='/'>
                    <Redirect to={routeConfig.ROUTE_PROFILE} />
                </Route>
                <Switch>
                    <Route exact path={routeConfig.ROUTE_HOME} component={HomeScreen} />
                    <Route exact path={routeConfig.ROUTE_EVENTS} component={EventsScreen} />
                    <Route exact path={routeConfig.ROUTE_PROFILE} component={ProfileScreen} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default Routes;

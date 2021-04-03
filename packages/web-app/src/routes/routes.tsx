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
import EventScreen from 'src/screens/event-screen';
import CompetitionScreen from 'src/screens/competition-screen';
import ScoreboardScreen from 'src/screens/scoreboard-screen';
import TimetableScreen from 'src/screens/timetable-screen';

const Routes: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isAuthenticatedActionCreator());
    }, [dispatch]);

    return (
        <ThemeProvider theme={Theme}>
            <BrowserRouter>
                <Route exact path='/'>
                    <Redirect to={routeConfig.ROUTE_EVENTS} />
                </Route>
                <Switch>
                    <Route exact path={routeConfig.ROUTE_EVENTS} component={EventsScreen} />
                    <Route exact path={routeConfig.ROUTE_PROFILE} component={ProfileScreen} />
                    <Route exact path={routeConfig.ROUTE_HOME} component={HomeScreen} />
                    <Route exact path={`${routeConfig.ROUTE_EVENT}/:eventId`} render={({ match: { params } }) => <EventScreen eventId={params.eventId} />} />
                    <Route
                        exact
                        path={`${routeConfig.ROUTE_COMPETITION}/:competitionId`}
                        render={({ match: { params } }) => <CompetitionScreen competitionId={params.competitionId} />}
                    />
                    <Route
                        exact
                        path={`${routeConfig.ROUTE_SCOREBOARD}/:eventId`}
                        render={({ match: { params } }) => <ScoreboardScreen eventId={params.eventId} />}
                    />
                    <Route
                        exact
                        path={`${routeConfig.ROUTE_TIMETABLE}/:eventId`}
                        render={({ match: { params } }) => <TimetableScreen eventId={params.eventId} />}
                    />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default Routes;

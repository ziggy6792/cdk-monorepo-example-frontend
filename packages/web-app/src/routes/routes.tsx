import React, { useEffect } from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isAuthenticatedActionCreator } from 'src/domain/auth';
import * as routeConfig from 'src/config/routes';
import HomeScreen from 'src/screens/home-screen';
import ProfileScreen from 'src/screens/profile-screen';
import EventsScreen from 'src/screens/events-screen';
import EventScreen from 'src/screens/event-screen';
import CompetitionManagerScreen from 'src/screens/competition-manager-screen';
// import ScoreboardScreen from 'src/screens/scoreboard-screen';
import TimetableScreen from 'src/screens/timetable-screen';
import CompetitionScreen from 'src/screens/competition-screen';
import HeatScreen from 'src/screens/heat-screen';
import ScoreboardScreens from 'src/screens/scoreboard-screens';

const Routes: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuthenticatedActionCreator());
  }, [dispatch]);

  // TODO - Add Protected Route
  return (
    <>
      <Route exact path='/'>
        <Redirect to={routeConfig.ROUTE_EVENTS} />
      </Route>
      <Switch>
        <Route exact path={routeConfig.ROUTE_EVENTS} component={EventsScreen} />
        <Route exact path={`${routeConfig.ROUTE_PROFILE}`} component={ProfileScreen} />
        <Route exact path={`${routeConfig.ROUTE_PROFILE}/:eventId`} render={({ match: { params } }) => <ProfileScreen eventId={params.eventId} />} />
        <Route exact path={routeConfig.ROUTE_HOME} component={HomeScreen} />
        <Route exact path={`${routeConfig.ROUTE_EVENT}/:eventId`} render={({ match: { params } }) => <EventScreen eventId={params.eventId} />} />
        <Route
          exact
          path={`${routeConfig.ROUTE_COMPETITION_MANAGER}/:competitionId`}
          render={({ match: { params } }) => <CompetitionManagerScreen competitionId={params.competitionId} />}
        />
        <Route
          exact
          path={`${routeConfig.ROUTE_COMPETITION}/:competitionId`}
          render={({ match: { params } }) => <CompetitionScreen competitionId={params.competitionId} />}
        />

        <Route path={`${routeConfig.ROUTE_LIVE}`} component={ScoreboardScreens} />

        <Route exact path={`${routeConfig.ROUTE_TIMETABLE}/:eventId`} render={({ match: { params } }) => <TimetableScreen eventId={params.eventId} />} />
        <Route exact path={`${routeConfig.ROUTE_HEAT}/:heatId`} render={({ match: { params } }) => <HeatScreen heatId={params.heatId} />} />
        {/* ToDo: Page not found */}
        <div>Page not found</div>
      </Switch>
    </>
  );
};

export default Routes;

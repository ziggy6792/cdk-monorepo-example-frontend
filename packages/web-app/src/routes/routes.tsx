import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isAuthenticatedActionCreator } from 'src/domain/auth';
import Theme from '../ui/theme';
import { ROUTE_PROFILE, ROUTE_HOME } from '../conf/navigation';
import HomeScreen from '../screens/home-screen';
import ProfileScreen from '../screens/profile-screen';

const Routes: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuthenticatedActionCreator());
  }, [dispatch]);

  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Route exact path='/'>
          <Redirect to={ROUTE_PROFILE} />
        </Route>
        <Switch>
          <Route exact path={ROUTE_HOME} component={HomeScreen} />
          <Route exact path={ROUTE_PROFILE} component={ProfileScreen} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routes;

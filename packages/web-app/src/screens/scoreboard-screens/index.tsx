import React, { useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isAuthenticatedActionCreator } from 'src/domain/auth';
import * as routeConfig from 'src/config/routes';

import Overview from './overview';
import Edit from './edit';

const Routes: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuthenticatedActionCreator());
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path={`${routeConfig.ROUTE_LIVE}/:eventId`} component={Overview} />
      <Route exact path={`${routeConfig.ROUTE_LIVE}/:eventId/edit`} component={Edit} />
    </Switch>
  );
};

export default Routes;

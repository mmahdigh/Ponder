import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Routes;

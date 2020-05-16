import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';

import SignIn from '../pages/SignIn';
import Dragons from '../pages/Dragons';

export default function Routes() {
  return (
    <Switch>
		<Route path="/" exact component={SignIn} />
		<Route path="/dragons" component={Dragons} isPrivate />
		<Route path="/dragon/:id" component={() => "a"} isPrivate />
		{/* <Route path="/dragon/:id" component={Dragons} isPrivate /> */}
    </Switch>
  );
}
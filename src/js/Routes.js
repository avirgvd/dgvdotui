
import React, { Component } from 'react';

import Dashboard from './screens/Dashboard';
import Settings from './screens/Settings';
import NotFound from './screens/NotFound';
import Main from './components/Main';

import Discovery from './screens/Discovery';
import About from './screens/About';
import {Route, useRouteMatch} from 'react-router-dom';
import {Box} from "grommet";

export default function () {
  // const { path } = useRouteMatch();
  let prefix = "/ui";

  if (process.env.NODE_ENV === 'production') {
    // Code will be removed from production build.
    prefix = "/ui";
  }
  else {
    prefix = "/ui";
  }

  //console.log("useRouteMatch prefix: ", prefix);

  return (
    <Box id="routesbox" as="main" overflow="auto" flex="grow" fill="vertical" align="center" justify="between" direction="row" >
      <Route exact path={`/`} component={Main} />
      <Route exact path={`${prefix}/`} component={Main} />
      <Route exact path={`${prefix}/dashboard`} component={Dashboard} />
      <Route path={`${prefix}/discovery`} component={Discovery} />
      <Route path={`${prefix}/settings`} component={Settings} />
      <Route path={`${prefix}/about`} component={About} />
    </Box>
  );
}

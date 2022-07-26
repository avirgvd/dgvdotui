import React, {useState, useEffect} from 'react';
// import { IntlProvider, addLocaleData } from 'react-intl';
import {IntlProvider} from 'react-intl';
// import en from 'react-intl/locale-data/en';
import {getCurrentLocale, getLocaleData} from './utils/Locale';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import Routes from './Routes';
import {Box, Grid, Grommet} from 'grommet';
// import {hpe} from 'grommet-theme-hpe';
import {redefinit} from './theme';
import {redefinit as redefinit2} from './theme_local';
import configureStore from './store';
import history from './history';
import {initialize, validateToken} from './actions/session';
import NavSidebar from './components/NavSidebar';
import {AppHeader} from "./components/AppHeader";
import {Solaris} from "grommet-icons";

const locale = getCurrentLocale();

// addLocaleData(en);
let messages;

try {
  messages = require(`./messages/${locale}`);
} catch (e) {
  messages = require('./messages/en-US');
}

const localeData = getLocaleData(messages, locale);
const localStorage = window.localStorage;

// listen for history changes and initiate routeChanged actions for them
history.listen((location) => {
  // const publish = store.getState().session.publishRoute;
  //console.log("history.listen: location: ", location);
  // console.log("publish: ", publish);
  // store.dispatch(routeChanged(location, false));
});

const store = configureStore(/* provide initial state if any */)
store.dispatch(initialize(window.location.pathname));
const currentState = store.getState();


export default function App() {
  //console.log("window.location.pathname: ", window.location.pathname);
  console.log("APP loading");


  let themeModeSetting = "light";
  let theme = redefinit2

  let main_content = Routes();
  //console.log("App: main_content: ", main_content);

  return (
    <Grommet full={true} theme={theme} themeMode={themeModeSetting}>
      <Provider store={store}>
        <IntlProvider locale={localeData.locale} messages={localeData.messages}>
          <Router history={history}>
            {/*<id="top1" direction="row" align="start" pad="small" justify="start" fill="vertical"></>*/}
            <Grid id="grid" responsive={true} justify="stretch" fill
              rows={['auto', 'flex']}
              columns={['auto', 'flex']}
              areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'nav', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] },
              ]}
            >
              <Box elevation="medium" gridArea="header" >
                <AppHeader
                  appName="POC APP"
                  appIcon={<Solaris size={"large"} color={"orange"}/>}
                />
              </Box>
              <Box id={"sidebar"} elevation="medium" gridArea="nav">
                <NavSidebar/>
              </Box>
              <Box gridArea="main">
                {main_content}
              </Box>
            </Grid>
          </Router>
        </IntlProvider>
      </Provider>
    </Grommet>
  );
}

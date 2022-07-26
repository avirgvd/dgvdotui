import { combineReducers } from 'redux';

import dashboard from './dashboard';
import nav from './nav';
import settings from './settings';
import { connectRouter } from 'connected-react-router';


const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  nav,
  dashboard,
  settings,
})


export default createRootReducer


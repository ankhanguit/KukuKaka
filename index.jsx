'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import Layout from './containers/Layout';
import Header from './components/Header';


import Menu from './containers/Menu';
import {SYSTEM_INIT} from './constants/ScreenId';
import {SystemInitAction} from './actions/SystemInitAction';
import ErrorPage from './containers/ErrorPage';
import configureStore from './store/configureStore';
import * as utils from './utils/StringUtils';
import rootSaga from './sagas';
import {polyfill} from 'es6-promise';
polyfill();
utils.polyfillForIE();
const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
store.runSaga(rootSaga);

injectTapEventPlugin();

store.dispatch(SystemInitAction(SYSTEM_INIT, 'INIT', {}));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Menu}>
        <Route path="*" component={ErrorPage} headerTitle='Error'/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);

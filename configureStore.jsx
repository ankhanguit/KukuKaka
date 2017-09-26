import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

const configureStore = (history, initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
      rootReducer
    , initialState
    , compose(applyMiddleware(sagaMiddleware, routerMiddleware(history))));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }
  store.runSaga = sagaMiddleware.run;
  return store;
};

export default configureStore;

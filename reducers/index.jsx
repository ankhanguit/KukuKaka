import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { receiveData } from './commonReducer';
import { SystemInitReducer } from './SystemInitReducer';
import { LoginReducer } from './LoginReducer';

const rootReducer = combineReducers({
      receiveData
    , SystemInitReducer
    , LoginReducer
    , routing: routerReducer
});

export default rootReducer;

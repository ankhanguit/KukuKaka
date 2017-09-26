import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { receiveData } from './commonReducer';
import { SystemInitReducer } from './SystemInitReducer';


const rootReducer = combineReducers({
      receiveData
    , SystemInitReducer

    , routing: routerReducer
});

export default rootReducer;

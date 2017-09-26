import {blue500, red500,indigo900} from 'material-ui/styles/colors';

import * as types from '../constants/ActionTypes';
import * as gamen from '../constants/ScreenId';
import * as utils from '../utils/StringUtils';
import * as message from '../constants/Message';
import { data } from './commonReducer';

export let dataInit = [];

const initialState = {
    dataInit : dataInit
};

function typeReducer(state, action) {
    return state;
}

function asyncReducer(state, action) {
  switch (action.preAction) {
    case types.SEARCH:
      dataInit = action.data['systemInits'];
      return {
        dataInit : action.data['systemInits']
      };
    default:
      return state;
  }
}

export function resultError(state, action) {
  let message = '';
  switch (action.error) {
    case types.ERROR:
      message = action.msgData.message;
      break;
    case types.NOT_FOUND:
    case types.EXCEPTION:
      message = "Server not found!";
      break;
    default:
      message = '';
  }

  return {
     state
 };
}

export function checkError(state = { }, action) {
  switch (action.error) {
    case types.ERROR:
    case types.NOT_FOUND:
    case types.EXCEPTION:
      return resultError(state, action);
    default:
      return state;
  }
}

export function SystemInitReducer(state = initialState, action) {
  switch (action.id) {
    case gamen.SYSTEM_INIT:
      if (action.error === types.ERROR || action.error === types.NOT_FOUND) {
        return checkError(state, action);
      }
      if (action.type === types.RECEIVE) {
        return asyncReducer(state, action);
      } else {
        return typeReducer(state, action);
      }
    default:
      return state;
  }
}

import { data } from './commonReducer';
import {blue500, red500,indigo900} from 'material-ui/styles/colors';

import * as types from '../constants/ActionTypes';
import * as screen from '../constants/ScreenId';
import * as utils from '../utils/StringUtils';
import * as message from '../constants/Message';

const initStatus = {
    msgFlag : false
  , msgConfirmFlag : false
};

const initialState = {
  LoginState : {
      userInfo : []
    , status : initStatus
    , message : []
  }
};

let userInfo = {};

function typeReducer(state, action) {
  switch (action.type) {
    case types.LOG_OUT:
    case types.CLOSE_DIALOG:
      return {
          LoginState : {
              userInfo : {}
            , status : {
                  msgFlag: false
                , msgConfirmFlag : false
              }
          }
      };
    default:
      return state;
  }
}

function asyncReducer(state, action) {
  switch (action.searchType) {
    case types.LOGIN:
      userInfo = action.data;
      return {
        LoginState : {
            userInfo : userInfo
          , status : {
              msgFlag: false
            , msgConfirmFlag : false
          }
        }
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
  userInfo = action.data;
  return {
    LoginState : {
         userInfo : userInfo
       , status : {
           msgFlag : true
         , msgConfirmFlag : false
         }
       , message : message
     }
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

export function LoginReducer(state = initialState, action) {
  switch (action.id) {
    case screen.LOGIN:
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

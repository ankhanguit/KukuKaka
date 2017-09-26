import {
  combineReducers
} from 'redux';
import * as types from '../constants/ActionTypes';
export let data = [];


export function receiveData(state = {
  items: []
}, action) {
  switch (action.type) {
    case types.RECEIVE:
      if (action.data != null) {
        data = action.data;
      }

      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
}

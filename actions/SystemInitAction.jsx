import * as types from '../constants/ActionTypes';
import * as url from '../constants/API';
import { fetchData } from './commonAction';
import {SYSTEM_INIT} from '../constants/ScreenId';
import { prevTypes } from '../actions/commonAction';

function typeAction(id, event, keySearch, editField) {
  switch (event) {
    case types.INIT:
      return {
          id : id
        , type : types.SEARCH
        , url : url.SYSTEM_INIT + "/?date=" + new Date().getTime()
        , method : 'GET'
        , dataJSON : null
      };
    default:
      return {
        type: ''
      };
  }
}

export function SystemInitAction(id, event, keySearch, editField) {
  switch (id) {
    case SYSTEM_INIT:
      return typeAction(id, event, keySearch, editField);
    default:
      return {
        type: ''
      };
  }
}

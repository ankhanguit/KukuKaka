import * as screen from '../constants/ScreenId';
import * as types from '../constants/ActionTypes';
import * as LoginAction from './LoginAction';

export function receivePosts(request, response, data, resultType) {
  switch (request.type) {
    case types.SEARCH:
    case types.EXPORT:
      if (resultType === types.ERROR) {
        return {
          id : request.id
        , type : types.RECEIVE
        , searchType : request.searchType
        , preAction : request.type
        , error : resultType
        , request : request
        , response : response
        , msgData : data
        , data : []
      };
      } else {
        return {
            id : request.id
          , type : types.RECEIVE
          , searchType : request.searchType
          , preAction : request.type
          , error : resultType
          , request : request
          , response: response
          , data: data
        };
      }
    case types.INSERT:
    case types.UPDATE:
    case types.DELETE:
      return {
          id : request.id
        , type : types.RECEIVE
        , preAction : request.type
        , error : resultType
        , request : request
        , response: response
        , msgData: data
      };
    case types.UPLOAD:
      return {
          id : request.id
        , type : types.RECEIVE
        , preAction : request.type
        , error : resultType
        , request : request
        , response: response
        , data: data
      };
    default:
      msgData = '';
  }
}



export function CommonAction(id, event, params) {
  switch (id) {
    case screen.LOGIN:
      return LoginAction.typeAction(id, event, params);
    default:
      return {
        type: ''
      };
  }
};

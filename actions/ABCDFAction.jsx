import * as types from '../constants/ActionTypes';
import * as url from '../constants/API';
import { fetchData } from './commonAction';
import * as gamen from '../constants/Constant';
import { prevTypes } from '../actions/commonAction';

let dataJSON = null;
let cstdCode = "";


export const chooseData = (row) =>{
    return {
        id : gamen.ABCDFURL
      , type: types.CHOOSE
      , row: row
    };
};

function typeAction(id, event, keySearch, editField) {
  switch (event) {
    case types.SEARCH:
      return {
          id : id
        , type : event
        , url : url.ABCDFURL_URL_SEARCH + keySearch + "&date=" + new Date().getTime()
        , method : 'GET'
        , closing: convertToClosing(editField.refs)
        , dataJSON : null
      };
    case types.EDIT:
      return {
          id : id
        , type: types.EDIT
      };
    case types.ADD_NEW:
      return {
          id : id
        , type: types.ADD_NEW
      };
    case types.VALIDATE:
      return {
          id: id
        , type : event
        , closing : convertToClosing(editField.refs)
      };
    case types.INSERT:
      return {
          id : id
        , type : event
        , url : url.ABCDFURL_URL_INSERT
        , closing : convertToClosing(editField.refs)
        , dataJSON : JSON.stringify(convertToClosing(editField.refs))
      };
    case types.UPDATE:
      return {
          id : id
        , type : event
        , method : 'PUT'
        , url : url.ABCDFURL_URL_UPDATE
        , closing : convertToClosing(editField.refs)
        , dataJSON : JSON.stringify(convertToClosing(editField.refs))
      };
    case types.DELETE:
      cstdCode = editField.refs.cstdCode.input.value;
      return {
          id : id
        , type : event
        , url : url.ABCDFURL_URL_DELETE + encodeURIComponent(cstdCode) + "&date=" + new Date().getTime()
        , closing : convertToClosing(editField.refs)
        , dataJSON : null
      };
    case types.INSERT_CONFIRM:
      return {
          id: id
        , confirmType : types.INSERT_OK
        , type : types.CONFIRM_DIALOG
        , closing : convertToClosing(editField.refs)
      };
    case types.DELETE_CONFIRM:
      return {
          id: id
        , confirmType : types.DELETE_OK
        , type : types.CONFIRM_DIALOG
        , closing : convertToClosing(editField.refs)
      };
    case types.UPDATE_CONFIRM:
      return {
          id: id
        , confirmType : types.UPDATE_OK
        , type : types.CONFIRM_DIALOG
        , closing : convertToClosing(editField.refs)
      };
    case types.CLOSE_DIALOG:
      return {
          id: id
        , type : event
        , closing : convertToClosing(editField.refs)
      };
    default:
      return {
        type: ''
      };
  }
}


function convertToClosing(refs) {
  let closing = {
      cstdCode: refs.cstdCode.input.value
    , cstdName : refs.cstdName.input.value
    , cstdTypeOther : refs.cstdTypeOther.props.value
  };
  return closing;
}

export function ABCDFURLAction(id, event, keySearch, editField) {
  switch (id) {
    case gamen.ABCDFURL:
      return typeAction(id, event, keySearch, editField);
    default:
      return {
        type: ''
      };
  }
}

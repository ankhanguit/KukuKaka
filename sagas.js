/* eslint-disable no-constant-condition */
import {
  take,
  put,
  call,
  fork,
  select,
  takeLatest
} from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';
import fetch from 'isomorphic-fetch';

import * as actions from '../actions/commonAction';
import * as types from '../constants/ActionTypes';

  export function* checkResponse(response) {
    let type = '';
    let json = '';
    try {
      json = yield response.json();
    } catch (e) {
      type = types.NOT_FOUND;
      json = '';
    }
    return {
          type : type
        , json : json
    };
  }

  export function* fetchUrl({url, body}) {
    let type = '';
    let response = null;
    let json = '';
    let result = '';

    try {
      response = yield fetch(encodeURI(url), body);
    } catch (e) {
      return {
            response : null
          , type : types.NOT_FOUND
          , json : json
      };
    }

    if (response.status >= 400) {
      type = types.ERROR;
      result = yield  call(checkResponse, response);
    } else {
      result = yield  call(checkResponse, response);
    }

    if (result.type !== '') {
      type = result.type;
    }
    return {
          response : response
        , type : type
        , json : result.json
    };
  }

  export function* searchData() {
    let request = yield take(types.SEARCH);
    let url = request.url;
    let body = {
        method: request.method
      , headers : request.headers
      , body: request.dataJSON
    };
    const result = yield  call(fetchUrl, {url, body});

    yield put( actions.receivePosts(request, result.response, result.json, result.type));
  }


  export function* insertData() {
    let request = yield take(types.INSERT);
    let url = request.url;
    let body = {
      method: 'POST'
      , headers: {
          'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body : request.dataJSON
    };
    const result = yield call(fetchUrl, {url, body});
    yield put( actions.receivePosts(request, result.response, result.json, result.type));
  }


  export function* uploadData() {
    let request = yield take(types.UPLOAD);
    let url = request.url;
    let body = {
        method: 'POST'
      , body: request.data
    };
    const result = yield call(fetchUrl, {url, body});
    yield put( actions.receivePosts(request, result.response, result.json, result.type));
  }


  export function* updateData() {
    let request = yield take(types.UPDATE);
    let url = request.url;
    let body = {
      method : 'PUT'
      , headers: {
          'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body : request.dataJSON
    };
    const result = yield call(fetchUrl, {url, body});
    yield put( actions.receivePosts(request, result.response, result.json, result.type));
  }


  export function* deleteData() {
    let request = yield take(types.DELETE);
    let url = request.url;
    let body = {
        method: 'DELETE'
        , headers: {
            'Accept': 'application/json'
          , 'Content-Type': 'application/json'
        }
      , body:null
    };
    const result = yield call(fetchUrl, {url, body});
    yield put(actions.receivePosts(request, result.response, result.json, result.type));
  }

  export function* exportData() {
    let request = yield take(types.EXPORT);
    let url = request.url;
    let body = {
          method: request.method
        , headers : request.headers
        , body: request.dataJSON
      };
    const result = yield call(fetchUrl, {url, body});
    yield put( actions.receivePosts(request, result.response, result.json, result.type));
  }

  function* root() {
      yield* [
          takeEvery(types.SEARCH, searchData)
        , takeEvery(types.INSERT, insertData)
        , takeEvery(types.UPDATE, updateData)
        , takeEvery(types.DELETE, deleteData)
        , takeEvery(types.EXPORT, exportData)
        , takeEvery(types.UPLOAD, uploadData)
        , fork(searchData)
        , fork(insertData)
        , fork(updateData)
        , fork(deleteData)
        , fork(exportData)
        , fork(uploadData)
      ];
  }

  export default root;

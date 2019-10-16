"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefault = setDefault;
exports.setParamsForGet = setParamsForGet;
exports.setParamsForPost = setParamsForPost;

function setDefault(options) {}

function setParamsForGet(options) {
  var params = '?timer=' + new Date().getTime() + '&';
  var opP = options.params;
  var keys = Object.keys(opP);

  if (options.headers.contentType.indexOf('application/json') >= 0) {
    params = params + 'params=' + encodeURIComponent(JSON.stringify(opP));
  } else {
    for (var i = 0; i < keys.length; i++) {
      params += keys[i] + '=' + opP[key[i]] + (i === keys.length - 1 ? '' : '&');
    }
  }

  return params;
}

function setParamsForPost(options) {
  var params = '';
  var opP = options.params;
  var keys = Object.keys(opP);

  if (options.headers.contentType.indexOf('application/json') >= 0) {
    params = encodeURIComponent(JSON.stringify(opP));
  } else if (options.headers.contentType.indexOf('application/x-www-form-urlencoded') >= 0) {
    for (var i = 0; i < keys.length; i++) {
      params += keys[i] + '=' + encodeURIComponent(opP[keys[i]]) + (i === keys.length - 1 ? '' : '&');
    }
  } else if (options.headers.contentType.indexOf('multipart/form-data') >= 0) {
    params = '';
  } else if (options.headers.contentType.indexOf('text/xml') >= 0) {
    params = '';
  }

  return params;
}
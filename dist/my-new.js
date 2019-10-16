"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = myNew;

function myNew(fun) {
  var params = Array.prototype.slice.call(arguments, 1);
  var ret = {};
  ret.__proto__ = fun.prototype;
  fun.apply(ret, params);
  return ret;
}
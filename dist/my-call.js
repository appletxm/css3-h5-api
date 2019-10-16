"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = init;

function init() {
  Function.prototype.myCall = function (context) {
    var ctx = context || window;
    var args = [];
    var result; // console.info(this, context, params)

    ctx.fn = this;

    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    params.forEach(function (param, index) {
      args.push('params[' + index + ']');
    });
    console.info('fun string:', 'ctx.fn(' + args + ')');
    result = eval('ctx.fn(' + args + ')');
    delete ctx.fn;
    return result;
  };
}
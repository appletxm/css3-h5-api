"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = init;

function init() {
  Function.prototype.myBind = function (context) {
    var ctx = context || window; // let emptyFn = function() {}

    var boundFn;
    var ctxType = ctx.constructor.name.toLowerCase();
    var self = this;
    var params = Array.prototype.slice.call(arguments, 1);

    if (typeof this !== 'function') {
      throw new Error('need a function to be callable');
    }

    if (ctxType === 'function') {
      ctx = new ctx();
    } else if (ctxType === 'array') {
      ctx = context.__proto__;
    }

    boundFn = function boundFn() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args = params.concat(args);
      self.apply(ctx, args);
    };

    return boundFn;
  };
}
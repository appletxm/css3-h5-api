"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
window.x = 'window global';
var x = 'module global';
var _default = {
  evalInner: function evalInner() {
    var x = 'eval inner';
    eval('console.info(x)');
  },
  evalCall: function evalCall() {
    var x = 'eval inner';
    eval.call(null, 'console.info(x)');
  },
  newFunction: function newFunction() {
    var x = 'function inner';
    var fn = new Function('console.info(x)');
    fn();
  }
}; // const regexp = RegExp('foo*', 'g');
// const str = 'table football, foosball';
// let matches = str.matchAll(regexp);
// for (const match of matches) {
//   console.log(match);
// }
// matches = str.matchAll(regexp);

exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyPromise = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var MyPromise =
/*#__PURE__*/
function () {
  function MyPromise(asynFn) {
    (0, _classCallCheck2["default"])(this, MyPromise);
    this.pending = true;
    this.fullfilled = false;
    this.rejected = false;
    this.thenCb = null;
    this.catchCb = null;
    this.finalyCb = null;
    asynFn(resolve, reject);
  }

  (0, _createClass2["default"])(MyPromise, [{
    key: "resolve",
    value: function resolve(data) {
      this.fullfilled = true;
      execCb(this.thenCb, data);
      execCb(this.finalyCb);
    }
  }, {
    key: "reject",
    value: function reject(error) {
      this.rejected = true;
      execCb(this.catchCb, error);
      execCb(this.finalyCb);
    }
  }, {
    key: "then",
    value: function then(thenFn) {
      this.thenCb = thenFn;
    }
  }, {
    key: "catch",
    value: function _catch(catchFn) {
      this.catchCb = catchFn;
    }
  }, {
    key: "finaly",
    value: function finaly(finalyFn) {
      this.finalyCb = finalyFn;
    }
  }], [{
    key: "execCb",
    value: function execCb(cb, parmas) {
      var result;

      if (cb && typeof cb === 'function') {
        result = cb(parmas);

        if (result instanceof MyPromise) {
          return result;
        } else {
          return new MyPromise(result);
        }
      }
    }
  }]);
  return MyPromise;
}();

exports.MyPromise = MyPromise;
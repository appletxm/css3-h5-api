import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';

var MyPromise = function () {
  function MyPromise(asynFn) {
    _classCallCheck(this, MyPromise);

    this.pending = true;
    this.fullfilled = false;
    this.rejected = false;
    this.thenCb = null;
    this.catchCb = null;
    this.finalyCb = null;

    asynFn(resolve, reject);
  }

  _createClass(MyPromise, [{
    key: 'resolve',
    value: function resolve(data) {
      this.fullfilled = true;
      execCb(this.thenCb, data);
      execCb(this.finalyCb);
    }
  }, {
    key: 'reject',
    value: function reject(error) {
      this.rejected = true;
      execCb(this.catchCb, error);
      execCb(this.finalyCb);
    }
  }, {
    key: 'then',
    value: function then(thenFn) {
      this.thenCb = thenFn;
    }
  }, {
    key: 'catch',
    value: function _catch(catchFn) {
      this.catchCb = catchFn;
    }
  }, {
    key: 'finaly',
    value: function finaly(finalyFn) {
      this.finalyCb = finalyFn;
    }
  }], [{
    key: 'execCb',
    value: function execCb(cb, parmas) {
      var result = void 0;

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

export { MyPromise };
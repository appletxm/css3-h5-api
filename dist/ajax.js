"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var setParams = _interopRequireWildcard(require("./ajax-set-params.js"));

var setHeaders = _interopRequireWildcard(require("./ajax-set-headers.js"));

var ajaxStream = _interopRequireWildcard(require("./ajax-get-stream.js"));

var defaultConfig = {
  method: 'GET',
  async: true,
  url: '',
  params: {},
  timeout: 30000,
  headers: {
    contentType: 'application/json; charset=UTF-8'
  }
};
var xhrList = {};

var Ajax =
/*#__PURE__*/
function () {
  function Ajax(opts) {
    (0, _classCallCheck2["default"])(this, Ajax);
    this.options = Object.assign(defaultConfig, opts);
  }

  (0, _createClass2["default"])(Ajax, [{
    key: "mergeOptions",
    value: function mergeOptions(options) {
      var copyOpts = JSON.parse(JSON.stringify(this.options));
      options = Object.assign(copyOpts, options);
      return options;
    }
  }, {
    key: "createXHR",
    value: function createXHR(options) {
      var xhr;

      if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      } else if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      }

      xhr.timeout = options.timeout;
      return xhr;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(xhrId, resolveCb, rejectCb, options) {
      var _this = this;

      var xhr = xhrList[xhrId]['xhr'];

      if (!xhr) {
        return false;
      }

      xhr.addEventListener('readystatechange', function () {
        // console.info(xhr.readyState, xhr.status)
        if (xhr.readyState === 4 && xhr.status === 200) {
          var resConType = xhr.getResponseHeader('content-type');

          if (resConType.indexOf('application/octet-stream') >= 0 || resConType.indexOf('application/x-msdownload') >= 0) {
            ajaxStream.doDownLoad(xhr);
          } else {
            var resObj = JSON.parse(xhr.responseText);

            _this.destroyed(xhrId);

            resolveCb({
              code: '200',
              data: resObj
            });
          }
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
          _this.destroyed(xhrId);

          rejectCb({
            code: '500',
            msg: xhr.response
          });
        }
      });
      xhr.addEventListener('timeout', function () {
        _this.destroyed(xhrId);

        rejectCb({
          code: '10000',
          msg: 'request timeout'
        });
      });
      xhr.addEventListener('error', function (e) {
        _this.destroyed(xhrId);

        rejectCb({
          code: '500',
          msg: e
        });
      });

      if (options.onProgress && typeof options.onProgress === 'function') {
        xhr.addEventListener('progress', function (e) {
          options.onProgress(e);
        });
      }
    }
  }, {
    key: "destroyed",
    value: function destroyed(xhrId) {
      if (xhrList[xhrId]) {
        delete xhrList[xhrId];
      }
    }
  }, {
    key: "prepareForAjax",
    value: function prepareForAjax(options) {
      var xhrObj;
      var xhrId;
      var resolveCb;
      var rejectCb;
      var promise;
      options = this.mergeOptions(options);
      xhrId = Math.random() + '';
      xhrList[xhrId] = {};
      xhrObj = this.createXHR(options);
      xhrList[xhrId]['options'] = options;
      xhrList[xhrId]['xhrId'] = xhrId;
      xhrList[xhrId]['xhr'] = xhrObj;
      promise = new Promise(function (resolve, reject) {
        // console.info(resolve, reject)
        rejectCb = reject;
        resolveCb = resolve;
      });
      return {
        options: options,
        xhrId: xhrId,
        xhrObj: xhrObj,
        promise: promise,
        resolveCb: resolveCb,
        rejectCb: rejectCb
      };
    }
  }, {
    key: "doAjax",
    value: function doAjax(options, xhrObj) {
      xhrObj.open(options.method, options.url, options.async);
      setHeaders.doSet(options, xhrObj);
      xhrObj.send(options.paramsStr);
    }
  }, {
    key: "get",
    value: function get(_options) {
      var params;
      _options.method = 'GET';

      var _this$prepareForAjax = this.prepareForAjax(_options),
          options = _this$prepareForAjax.options,
          xhrObj = _this$prepareForAjax.xhrObj,
          promise = _this$prepareForAjax.promise,
          resolveCb = _this$prepareForAjax.resolveCb,
          rejectCb = _this$prepareForAjax.rejectCb,
          xhrId = _this$prepareForAjax.xhrId;

      if (options.method === 'GET' && xhrObj) {
        params = setParams.setParamsForGet(options);
      }

      options.url = options.url + params;
      this.addEventListener(xhrId, resolveCb, rejectCb, options);
      this.doAjax(options, xhrObj);
      return promise;
    }
  }, {
    key: "post",
    value: function post(_options) {
      _options.method = 'POST';

      var _this$prepareForAjax2 = this.prepareForAjax(_options),
          options = _this$prepareForAjax2.options,
          xhrObj = _this$prepareForAjax2.xhrObj,
          promise = _this$prepareForAjax2.promise,
          resolveCb = _this$prepareForAjax2.resolveCb,
          rejectCb = _this$prepareForAjax2.rejectCb,
          xhrId = _this$prepareForAjax2.xhrId;

      if (options.method === 'POST' && xhrObj) {
        options.paramsStr = setParams.setParamsForPost(options);
      }

      this.addEventListener(xhrId, resolveCb, rejectCb, options);
      this.doAjax(options, xhrObj);
      return promise;
    }
  }, {
    key: "getBinary",
    value: function getBinary(_options) {
      var params;
      _options.method = 'GET';

      var _this$prepareForAjax3 = this.prepareForAjax(_options),
          options = _this$prepareForAjax3.options,
          xhrObj = _this$prepareForAjax3.xhrObj,
          promise = _this$prepareForAjax3.promise,
          resolveCb = _this$prepareForAjax3.resolveCb,
          rejectCb = _this$prepareForAjax3.rejectCb,
          xhrId = _this$prepareForAjax3.xhrId;

      if (options.method === 'GET' && xhrObj) {
        params = setParams.setParamsForGet(options);
      }

      options.url = options.url + params; // options.type = 'binary'

      xhrObj.responseType = "arraybuffer";
      this.addEventListener(xhrId, resolveCb, rejectCb, options);
      this.doAjax(options, xhrObj);
      return promise;
    }
  }]);
  return Ajax;
}();

var _default = Ajax;
exports["default"] = _default;
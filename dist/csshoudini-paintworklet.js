"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

registerPaint('wave',
/*#__PURE__*/
function () {
  function _class() {
    (0, _classCallCheck2["default"])(this, _class);
  }

  (0, _createClass2["default"])(_class, [{
    key: "paint",
    value: function paint(ctx, geom, properties) {
      var color = properties.get('--rect-color');
      ctx.fillStyle = color.cssText;
      ctx.fillRect(0, 0, geom.width, geom.height);
    }
  }], [{
    key: "inputProperties",
    get: function get() {
      return ['--rect-color'];
    }
  }]);
  return _class;
}());
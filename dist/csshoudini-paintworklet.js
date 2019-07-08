import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
registerPaint('wave', function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: 'paint',
    value: function paint(ctx, geom, properties) {
      var color = properties.get('--rect-color');
      ctx.fillStyle = color.cssText;
      ctx.fillRect(0, 0, geom.width, geom.height);
    }
  }], [{
    key: 'inputProperties',
    get: function get() {
      return ['--rect-color'];
    }
  }]);

  return _class;
}());
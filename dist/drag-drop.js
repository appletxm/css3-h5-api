"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _dragUtils = require("./drag-utils.js");

var DragDrop =
/*#__PURE__*/
function () {
  function DragDrop(options) {
    (0, _classCallCheck2["default"])(this, DragDrop);
    this.options = options;
    this.addEventLisetner();
  }

  (0, _createClass2["default"])(DragDrop, [{
    key: "addEventLisetner",
    value: function addEventLisetner() {
      var fromObj = this.options.fromObj;
      var toObj = this.options.toObj;
      fromObj.addEventListener('dragstart', function (event) {
        this.handDragStart(event);
      }.bind(this));
      toObj.addEventListener('dragenter', function (event) {
        this.handDragEnter(event);
      }.bind(this)); // document.addEventListener('dragleave', function (event) {
      //   console.log('drag leave: ' + event.dataTransfer)
      // })

      toObj.addEventListener('dragover', function (event) {
        this.handleDragOver(event);
      }.bind(this));
      toObj.addEventListener('drop', function (event) {
        this.handleDrop(event);
      }.bind(this));
      document.addEventListener('dragend', function (event) {
        this.handleDragEnd(event);
      }.bind(this));
    }
  }, {
    key: "handDragStart",
    value: function handDragStart(event) {
      // event.dataTransfer.effectAllowed = 'none'
      console.log('drag start: ' + event.dataTransfer); // event.dataTransfer.setData('text', '我自定义的拖拉内容')
    }
  }, {
    key: "handDragEnter",
    value: function handDragEnter(event) {
      var toObj = this.options.toObj;
      console.log('drag enter: ' + event.dataTransfer);

      if (event.target === toObj) {
        event.dataTransfer.dropEffect = 'move';
        event.target.className = 'drag-drop-panel drag-drop-panel-to';
      }
    }
  }, {
    key: "handleDragOver",
    value: function handleDragOver(event) {
      // let toObj = this.options.toObj
      event.preventDefault();
      console.log('drag over: ' + event.dataTransfer); // if(event.target === toObj){
      //   event.dataTransfer.dropEffect = 'link'
      //   event.target.className = 'drag-drop-panel drag-drop-panel-to'
      // }
    }
  }, {
    key: "handleDrop",
    value: function handleDrop(event) {
      var toObj = this.options.toObj;
      var files;
      var items;
      console.log('drop: ' + event.dataTransfer);
      event.preventDefault();
      toObj.className = 'drag-drop-panel';

      if (event.target === toObj) {
        files = event.dataTransfer.files || [];
        items = event.dataTransfer.items || [];

        if (files.length === 0 && items.length === 0) {
          return false;
        }

        event.target.className = 'drag-drop-panel drag-drop-panel-to'; // console.info(event.dataTransfer.getData('text'))

        if (files.length === 0) {
          (0, _dragUtils.handleDataTransferItems)(items).then(function (res) {
            (0, _dragUtils.handleShowEvent)(res, toObj);
          });
        } else {
          (0, _dragUtils.handleUploadEvent)(files, toObj);
        }
      } else {
        return false;
      }
    }
  }, {
    key: "handleDragEnd",
    value: function handleDragEnd(event) {
      var toObj = this.options.toObj;
      event.preventDefault();
      console.log('drag end: ' + event.dataTransfer); // console.log(event.target)

      this.options.toObj.className = 'drag-drop-panel';
    }
  }]);
  return DragDrop;
}();

exports["default"] = DragDrop;
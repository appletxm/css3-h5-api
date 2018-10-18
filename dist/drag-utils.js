import _Array$from from 'babel-runtime/core-js/array/from';
import _Promise from 'babel-runtime/core-js/promise';
import { uploadFile } from './ajax-upload-binary.js';
import { readFiles } from './drag-read-files.js';

export function handleDataTransferItems(items) {
  var total = items.length;
  var promise = void 0,
      resolveCb = void 0,
      rejectCb = void 0;

  promise = new _Promise(function (resolve, reject) {
    resolveCb = resolve;
    rejectCb = reject;
  });

  for (var i = 0; i < items.length; i += 1) {
    var kind = items[i].kind;
    var type = items[i].type;
    var result = [];

    if (kind == 'string') {
      if (type.indexOf('text/plain') !== -1) {
        items[i].getAsString(function (str) {
          total--;

          result.push({
            type: 'text/plain',
            value: str
          });

          if (total === 0) {
            resolveCb(result);
          }
        });
      } else if (type.indexOf('text/html') !== -1) {
        items[i].getAsString(function (str) {
          total--;
          result.push({
            type: 'text/html',
            value: str
          });
          if (total === 0) {
            resolveCb(result);
          }
        });
      } else if (type.indexOf('text/uri-list') !== -1) {
        items[i].getAsString(function (str) {
          total--;
          result.push({
            type: 'text/uri-list',
            value: str
          });
          if (total === 0) {
            resolveCb(result);
          }
        });
      }
    } else if (kind == 'file') {
      // 如果是图片
      // if (type.indexOf('image/') != -1) {
      var file = items[i].getAsFile();
      total--;
      result.push({
        type: type,
        value: file
      });
      if (total === 0) {
        resolveCb(result);
      }
      // }
    }
  }

  return promise;
}

export function handleShowEvent(items, toObj) {
  var htmlNode = void 0;
  items.forEach(function (item) {
    if (item.type === 'text/html') {
      htmlNode = document.createElement('div');
      htmlNode.innerHTML = item.value;
      toObj.appendChild(htmlNode);
    }
  });
}

export function handleUploadEvent(files, toObj) {
  _Array$from(files).forEach(function (file) {
    // uploadFile(file, toObj)
    readFiles(file).then(function (res) {
      // console.info(res)
      return uploadFile(res, '/api/upload?name=' + encodeURIComponent(file.name) + '&type=' + file.type);
    });
  });
}

// function uploadFile (file, toObj) {
//   var xhr = new XMLHttpRequest()
//   var upload = xhr.upload
//   var progressbar = document.createElement('div')
//   var p = document.createElement('p')
//   var reader = new FileReader()

//   p.textContent = '0%'
//   progressbar.appendChild(p)
//   toObj.appendChild(progressbar)
//   upload.progressbar = progressbar

//   // 设置上传文件相关的事件处理函数
//   upload.addEventListener('progress', uploadProgress, false)
//   upload.addEventListener('load', uploadSucceed, false)
//   upload.addEventListener('error', uploadError, false)

//   // 上传文件
//   xhr.open('POST', '/api/upload?fileName=' + file.name)
//   xhr.overrideMimeType('application/octet-stream')
//   xhr.sendAsBinary(reader.readAsBinaryString(file))
// }

// function uploadProgress (event) {
//   if (event.lengthComputable) {
//     // 将进度换算成百分比
//     var percentage = Math.round((event.loaded * 100) / event.total)
//     console.log('percentage:' + percentage)
//     if (percentage < 100) {
//       event.target.progressbar.firstChild.style.width = (percentage * 2) + 'px'
//       event.target.progressbar.firstChild.textContent = percentage + '%'
//     }
//   }
// }

// function uploadSucceed (event) {
//   event.target.progressbar.firstChild.style.width = '200px'
//   event.target.progressbar.firstChild.textContent = '100%'
// }

// function uploadError (error) {
//   alert('error: ' + error)
// }
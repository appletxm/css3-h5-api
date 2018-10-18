import _Promise from "babel-runtime/core-js/promise";
export function readFiles(file) {
  var reader = new FileReader();
  var promise = void 0,
      resolveCb = void 0,
      rejectCb = void 0;

  promise = new _Promise(function (resolve, reject) {
    resolveCb = resolve;
    rejectCb = reject;
  });

  reader.onloadstart = function () {
    console.log("onloadstart", reader.readyState);
  };

  reader.onerror = function () {
    console.log("onerror", reader.readyState);
    rejectCb(new Error("reader file error " + file.name));
  };

  reader.onprogress = function () {
    console.log("onprogress", reader.readyState);
  };

  reader.onload = function (event) {
    console.log("onload", reader.readyState);
    resolveCb(event.target.result);
    // resolveCb(reader.result)
  };

  reader.onloadend = function () {
    console.log("onloadend", reader.readyState);
  };

  reader.readAsBinaryString(file);
  // reader.readAsArrayBuffer(file)

  return promise;
}
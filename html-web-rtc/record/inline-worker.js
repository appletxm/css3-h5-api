var globalVar = window || global 
var WORKER_ENABLED = !!(globalVar && globalVar.URL && globalVar.Blob && globalVar.Worker);

function InlineWorker(func, self) {
  var _this = this;
  var functionBody;

  self = self || {};

  if (WORKER_ENABLED) {
    functionBody = func.toString().trim().match(
      /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
    )[1];

    return new globalVar.Worker(globalVar.URL.createObjectURL(
      new globalVar.Blob([functionBody], {
        type: "text/javascript"
      })
    ));
  }

  function postMessage(data) {
    setTimeout(function () {
      _this.onmessage({
        data: data
      });
    }, 0);
  }

  this.self = self;
  this.self.postMessage = postMessage;

  setTimeout(func.bind(self, self), 0);
}

InlineWorker.prototype.postMessage = function postMessage(data) {
  var _this = this;

  setTimeout(function () {
    _this.self.onmessage({
      data: data
    });
  }, 0);
};

InlineWorker.prototype.ternimate = function() {
  this.ternimate()
}

export default InlineWorker
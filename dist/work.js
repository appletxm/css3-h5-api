var max = 0;
var count = 0;

function startCalculator() {
  count = 0;
  for (var i = 0; i < max; i++) {
    console.info('#############', count);
    count += i;
  }
  self.postMessage(count);
}

self.onmessage = function (event) {
  console.info('$$$$$$$$$$$$$', event);
  max = event.data;
  startCalculator();
};
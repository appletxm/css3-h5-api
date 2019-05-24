let max = 0
let count = 0

function startCalculator() {
  count = 0
  for(let i = 0; i < max; i++) {
    console.info('#############', count)
    count += i
  }
  self.postMessage(count)
}

self.onmessage = function (event) {
  console.info('$$$$$$$$$$$$$', event)
  max = event.data
  startCalculator()
}
console.log('**web workered**')

self.addEventListener('message', (e) => {
  console.info('**worker recieve message**', e)
})

setTimeout(() => {
  self.postMessage({
    test: 'txm',
    complicated: {
      age: 999
    }
  })
}, 5000)
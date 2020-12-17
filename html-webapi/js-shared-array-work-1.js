var config = {}

function doCompress() {
  console.info(config)
}

self.addEventListener('message', function(event) {
  // console.info(event.data)
  var data = event.data

  if (data.type === 'compress') {
    config = data.config
    doCompress()
  }
})

// postMessage('test')
var config = {}
var offCanvas = new OffscreenCanvas(800, 400)
var ctx = offCanvas.getContext('2d')
var blob = null

console.info(ctx)

function getImageSuccess(blob) {
  console.info(URL)
  var url = URL.createObjectURL(blob)
  console.info(url)
}

function getImage() {
  // console.info(config)
  var xhr = new XMLHttpRequest()

  xhr.addEventListener('load', function(event) {
    // console.info('======', event.target.response)
    blob = new URL(event.target.response)
  
    getImageSuccess()
  })

  xhr.responseType = 'arraybuffer' // blob, arraybuffer
  xhr.open('GET', config.imageUrl, true)
  xhr.send()
}

function doCompress() {
  console.info(config)
}

self.addEventListener('message', function(event) {
  // console.info(event.data)
  var data = event.data

  if (data.type === 'compress') {
    config = data.config
    getImage()
    // doCompress()
  }
})

// postMessage('test')
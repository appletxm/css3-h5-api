var config = {}
var offCanvas = null
var ctx = null
var blob = null
var bitMap = null
var sourceType = null
var stb = null

// console.info(ctx)

function setImageToCache(ctx, bitMap) {
  var imageData = ctx.getImageData(0, 0, bitMap.width, bitMap.height)
  var data = imageData.data

  console.info('imageData.data.length:', data.length)

  stb = new SharedArrayBuffer(data.length)
  var uint8 = new Uint8ClampedArray(stb)
  // var view = new DataView(stb, 0)

  data.forEach(function(imgData, index) {
    uint8[index] = imgData
    // view.setUint8(index, imgData)
  })

  stb.width = bitMap.width
  stb.height = bitMap.height

  return stb
}

function createCanvas(bitMap) {
  offCanvas = new OffscreenCanvas(400, 500)
  ctx = offCanvas.getContext('2d')

  // console.info(offCanvas.width, offCanvas.height)

  self.createImageBitmap(bitMap, 0, 0, bitMap.width, bitMap.height, {
    // resizeWidth: 200,
    resizeHeight: 200
  }).then(res => {
    bitMap = res
    console.info('************', bitMap)

    // offCanvas.width = bitMap.width
    // offCanvas.height = bitMap.height
    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.arc(300, 300, 50, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()

    ctx.drawImage(bitMap, 0, 0, bitMap.width, bitMap.height, 0, 0, bitMap.width, bitMap.height)
    // console.info(ctx.getImageData(0,0,200,100), offCanvas.toBlob, offCanvas.toDataURL)
    offCanvas.convertToBlob({
      type: sourceType,
      quality: 1
    }).then(res => {
      console.info(res)

      var url = URL.createObjectURL(res)

      var stb = setImageToCache(ctx, bitMap)
  
      postMessage({
        type: 'imageUrl',
        url,
        stb,
        imgInfo: {
          width: bitMap.width,
          height: bitMap.height
        }
      })
    }).catch(err => {
      console.info('err:', err)
    })
  }).catch(err => {
    console.info('err:', err)
  })

  // console.info(ctx.getImageData(0, 0, 200, 100))
  // var imageData = ctx.getImageData(0, 0, 200, 100)
  // var blob = new Blob([imageData.data], {type})
  // var url = URL.createObjectURL(blob)
  // postMessage({
  //   type: 'imageUrl',
  //   url
  // })
}

function getBitMap(blob) {
  self.createImageBitmap(blob).then(res => {
    bitMap = res
    // console.info(bitMap)
    createCanvas(bitMap)
  }).catch(error => {
    console.info('error:', error)
  })
}

function getImageSuccess(blob, type) {
  // blob = new Blob([arrayBuffer], {type})
  // var url = URL.createObjectURL(blob)
  sourceType = type

  console.info(blob)

  getBitMap(blob)

  // postMessage({
  //   type: 'imageUrl',
  //   url
  // })
}

function getImage() {
  // console.info(config)
  var xhr = new XMLHttpRequest()

  xhr.addEventListener('load', function(event) {
    // console.info('======', event.target.response)
    blob = event.target.response
    // var arrayBuffer = event.target.response
    // console.info(xhr.getResponseHeader('content-type'))
    // console.info(xhr.getAllResponseHeaders())
    getImageSuccess(blob, xhr.getResponseHeader('content-type'))
  })

  xhr.responseType = 'blob' // blob, arraybuffer
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
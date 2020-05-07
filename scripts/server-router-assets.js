const fs = require('fs')
const path = require('path')
const getContentType = require('./server-get-content-type')
const excelOpts = require('./excel-opts')

function getGMTdate(){
  let date = new Date()
  let mileSecondes = date.getTime()
  let gmtDate

  // mileSecondes = mileSecondes + 1 * 1000 * 5
  gmtDate = (new Date(mileSecondes)).toGMTString()

  return gmtDate
}

function cacheControl(res){
  // res.set('Cache-Control', 'max-age=600') //http 1.1 all response request html
  // res.set('Pragma', 'no-cache') //http1.0  all response request html
  // res.set('Expires', getGMTdate()) //http1.0  all response request html

  res.set('Last-Modified', getGMTdate()) //http1.1 response
  res.set('ETag', '1234567890') //http1.1 response
}

function getImageFile (req, res) {
  let filename = path.join(__dirname, ('..' + req.originalUrl))
  let fileType = (req.originalUrl).match(/.+\.(.+)/)
  let file = fs.readFileSync(filename)
  let contentType = getContentType(fileType[1])

  res.set('Content-Type', contentType)
  res.send(file)
  res.end()
}

function getHtmlFile (req, res) {
  let htmlFilePath = path.join(__dirname, req.originalUrl === '/' ? '../index.html' : ('../' + req.originalUrl))
  let html = fs.readFileSync(htmlFilePath)
  let contentType = getContentType('html')

  res.set('Content-Type', contentType)
  res.send(html)
  res.end()
}

function getScriptFile (req, res) {
  let scriptFilePath = path.join(__dirname, '..' + req.originalUrl)
  let script = fs.readFileSync(scriptFilePath)
  let contentType = getContentType('js')

  res.set('Content-Type', contentType)
  res.send(script)
  res.end()
}

function getCssFile (req, res) {
  console.info('====get css file')
  let filePath = path.join(__dirname, '../' + req.path)
  let file = fs.readFileSync(filePath)
  let contentType = getContentType('css')

  res.set('Content-Type', contentType)
  res.send(file)
  res.end()
}

function getPdfFile (req, res) {
  let filePath = decodeURIComponent(path.join(__dirname, '../' + req.path))
  let file = fs.readFileSync(filePath)
  let contentType = getContentType('pdf')

  res.set('Content-Type', contentType)
  res.send(file)
  res.end()
}

function resRage(file, req, res, contentType) {
  var range = req.headers.range
  var total = file.length
  var split = range.split(/[-=]/)
  var ini = +split[1]
  var end = split[2]? +split[2] : total-1
  var chunkSize = end - ini + 1
  if (parseInt(ini) >= total || parseInt(end) >= total) {
    //Indicate the acceptable range.
    res.status(416)
    res.set("Content-Range",'bytes */' + total) // File size.
    //Return the 416 'Requested Range Not Satisfiable'.
      res.end()
  }
  res.status(206)
  res.set('Connection', 'keep-alive')
  res.set("Content-Range","bytes " + ini + "-" + end + "/" + total)
  res.set("Accept-Ranges", "bytes")
  res.set("Content-Length", chunkSize)
  res.set("Content-Type", contentType)
  res.end(file.slice(ini, chunkSize+ini))

  // res.status(206);
  // res.set('Connection', 'keep-alive');
  // res.set("Content-Range","bytes " + ini + "-" + end + "/" + total);
  // res.set("Accept-Ranges", "bytes");
  // res.set("Content-Length", chunkSize);
  // res.set("Content-Type", contentType);
  // fs.createReadStream(filename, { start: ini, end: end }).pipe(res)
}

function getMp4File (req, res) {
  let filePath = decodeURIComponent(path.join(__dirname, '../' + req.path))
  let file = fs.readFileSync(filePath)
  let contentType = getContentType('mp4')

  res.set('Content-Type', contentType)
  if (req.headers.range) {
    resRage(file, req, res, contentType)
  } else {
    res.send(file)
    res.end()
  }
}

function getExcelFile (req, res) {
  excelOpts.downLoadExcel(req, res)
}

function routerAssets (req, res, logger) {
  console.info('[http get]', req.baseUrl, req.originalUrl)
  logger.info('[http get]', req.baseUrl, req.originalUrl)

  cacheControl(res)

  if (req.originalUrl.indexOf('assets/images') >= 0) {
    getImageFile(req, res)
  } else if (req.originalUrl.indexOf('.js') >= 0) {
    getScriptFile(req, res)
  } else if (req.originalUrl.indexOf('.css') >= 0) {
    getCssFile(req, res)
  } else if (req.originalUrl.indexOf('.html') >= 0 || req.originalUrl.indexOf('.htm') >= 0) {
    getHtmlFile(req, res)
  } else if (req.originalUrl.indexOf('.pdf') >= 0) {
    getPdfFile(req, res)
  } else if(req.originalUrl.indexOf('download-excel') >= 0) {
    getExcelFile(req, res)
  } else if (req.originalUrl.indexOf('.mp4') >= 0) {
    getMp4File(req, res)
  } else {
    getHtmlFile(req, res)
  }

  // if (next && typeof next === 'function') {
  //   next()
  // }
}

module.exports = routerAssets

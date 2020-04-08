const express = require('express')
// const path = require('path')
// const open = require('open')
const app = express()
const assignRouter = require('./server-router-assets')
const apiRouter = require('./server-router-api')
const logger = require('./server-log')

const port = 9000
const host = '0.0.0.0'

app.use(['/api', '/app/v1', '/web'], (req, res) => {
  apiRouter(req, res, logger)
})

app.use('/*.html', function (req, res) {
  assignRouter(req, res, logger)
})

app.use('/*.js', function (req, res) {
  assignRouter(req, res, logger)
})

app.use('/*.css', function (req, res) {
  assignRouter(req, res, logger)
})

app.use(['/.png', '/*.jpg', '/*.gif', '/*.jpeg'], function (req, res) {
  assignRouter(req, res, logger)
})

app.use(['/', '/src', '/assets'], (req, res) => {
  assignRouter(req, res, logger)
})

app.use('*', (req, res) => {
  logger.info('No Url Matched', req.originalUrl)
  res.send('no matched url')
})

app.listen(port, host, function () {
  let url = 'http://' + host + ':' + port
  console.info('dev server started at: ', url)
  logger.info('dev server started at: ', url)

// setTimeout(function () {
//   let openUrl = url
//   open(openUrl, 'chrome')
// }, 3000)
})

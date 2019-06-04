const http2 = require('http2')
const fs = require('fs')
const path = require('path')
const PORT = 3000
const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../http2-auth/server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../http2-auth/server.crt'))
}
const server = http2.createSecureServer(options, (req, res) => {
  res.end('<h1>Hello World!</h1>')
})

server.listen(PORT, host = '127.0.0.1', (err) => {
  if (err) {
    console.error(err)
    return process.exit(1)
  }

  console.log(`Server is running on https://${host}:${ PORT }`)
})
let data = null
let count = 0
let clients = []
self.addEventListener('connect', function (e) {
  const port = e.ports[0]

  console.info(e.ports)
  clients.push(port)

  count++
  port.postMessage(`Hello #${count}`)

  port.addEventListener('message', function (event) {
    // console.info('share worker ******* event:', event)
    // if (event.data.get === true) {
    //   port.postMessage(event.data)
    // } else {
    //   data = event.data
    // }

    console.info('******', event, clients.length)
    clients.forEach(function(client) {
      client.postMessage(event.data)
    })
  })

  port.start()
})

// var connections = 0 // count active connections
// self.addEventListener('connect', function (e) {
//   var port = e.ports[0]
//   connections++

//   port.addEventListener('message', function (e) {
//     port.postMessage(`Hello ${e.data} (port #${connections})`)
//   }, false)

//   port.start()
// }, false)

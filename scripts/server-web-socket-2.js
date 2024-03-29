// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';

// Port where we'll run the websocket server
const webSocketsServerPort = 3001;

// websocket and http servers
const webSocketServer = require('websocket').server;
const http = require('http');

/**
 * Global variables
 */
// latest 100 messages
let history = [];
// list of currently connected clients (users)
let clients = [];

/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
  return String(str).replace(/&/g, '&').replace(/>/g, '>').replace(/"/g, '"');
}

// Array with some colors
const colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
// ... in random order
colors.sort(function (a, b) {
  return Math.random() > 0.5;
});

/**
 * HTTP server
 */
const server = http.createServer(function (request, response) {
  // Not important for us. We're writing WebSocket server, not HTTP server
});
server.listen(webSocketsServerPort, function () {
  console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
const wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket request is just
  // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function (request) {
  console.log(' Connection from origin ' + request.origin + '.');

  const connection = request.accept(null, request.origin);

  // we need to know client index to remove them on 'close' event
  const index = clients.push(connection) - 1;
  let userName = false;
  let userColor = false;

  console.log(' Connection accepted.');

  // send back chat history
  if (history.length > 0) {
    connection.sendUTF(JSON.stringify({
      type: 'history',
      data: history
    }));
  }

  // user sent some message
  connection.on('message', function (message) {
    if (message.type === 'utf8') { // accept only text
      if (userName === false) { // first message sent by user is their name
        // remember user name
        userName = htmlEntities(message.utf8Data);
        // get random color and send it back to the user
        userColor = colors.shift();
        connection.sendUTF(JSON.stringify({
          type: 'color',
          data: userColor
        }));
        console.log(' User is known as: ' + userName +
          ' with ' + userColor + ' color.');

      } else { // log and broadcast the message
        console.log(' Received Message from ' +
          userName + ': ' + message.utf8Data);

        // we want to keep history of all sent messages
        var obj = {
          time: (new Date()).getTime(),
          text: htmlEntities(message.utf8Data),
          author: userName,
          color: userColor
        };

        if (message.utf8Data.indexOf('again') >= 0) {
          obj.needClose = true
        }

        history.push(obj);
        history = history.slice(-100);

        // broadcast message to all connected clients
        var json = JSON.stringify({
          type: 'message',
          data: obj
        });
        for (var i = 0; i < clients.length; i++) {
          clients[i].sendUTF(json);
        }
      }
    }
  });

  // user disconnected
  connection.on('close', function (connection) {
    if (userName !== false && userColor !== false) {
      console.log(" Peer " +
        connection.remoteAddress + " disconnected.");
      // remove user from the list of connected clients
      clients.splice(index, 1);
      // push back user's color to be reused by another user
      colors.push(userColor);
    }
  });

});

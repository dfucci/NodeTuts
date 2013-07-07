var fs, http, io, server, socket, sys;
io = require('socket.io');
http = require('http');
sys = require('sys');
fs = require('fs');
server = http.createServer(function(req, res) {
  var rs;
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  rs = fs.createReadStream(__dirname + '/template.html');
  return sys.pump(rs, res);
});
socket = io.listen(server);
server.listen(8080);
socket.set('log level', 1);
socket.sockets.on('connection', function(client) {
  var username;
  console.log('connection accepted');
  client.send('Welcome, enter username');
  username = '';
  return client.on('message', function(message) {
    console.log('message received ' + message);
    if (username === '') {
      username = message;
      return client.send('Welcome ' + username);
    } else {
      client.broadcast.send(username + ': ' + message);
      return client.send('Tu hai scritto: ' + message);
    }
  });
});
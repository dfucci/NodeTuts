io = require 'socket.io'
http = require 'http'
sys = require 'sys'
fs = require 'fs'

server = http.createServer (req, res)->
  res.writeHead 200, {
    'Content-Type' : 'text/html'
  }
  rs = fs.createReadStream __dirname + '/template.html'
  sys.pump rs, res

socket = io.listen server
server.listen 8080
socket.set('log level', 1);
socket.sockets.on 'connection', (client)->
  console.log 'connection accepted' 
  client.send 'Welcome, enter username'

  username = ''
  client.on 'message', (message)->
    console.log 'message received ' + message
    if username is ''
      username=message
      client.send 'Welcome ' + username
    else
      client.broadcast.send username+ ': ' + message
      
      client.send  'Tu hai scritto: ' + message 

   


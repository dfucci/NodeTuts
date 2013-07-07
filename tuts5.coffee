net = require 'net'
carrier = require 'carrier'
connections=Array()
net.createServer( (conn)->
  connections.push conn
  conn.on 'close', ()->
    pos = connections.indexOf conn
    if pos >=0
      connections.splice pos, 1
      
  conn.write 'hello\n Who r u?\n'
  username=''
  carrier.carry conn, (line)->
    if username is '' 
      username=line
      conn.write 'hello ' + username + '\n'
      return
    if line is 'quit'
      conn.end()
      return
    feedback = username + ': ' + line + '\n'
    connections.forEach (one_conn)->
      if one_conn isnt conn
        one_conn.write feedback 

    

  
).listen 3001


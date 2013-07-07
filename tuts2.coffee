http=require 'http'
spawn = require('child_process').spawn

http.createServer( (req, res)->
 res.writeHead 200, 'Content-Type': 'text/plain'
 tail_content = spawn 'tail', ['-f', '/var/log/system.log']
 req.connection.on 'end', ()->
   tail_content.kill()
 tail_content.stdout.on 'data', (data)->
   console.log data.toString()
   res.write data
).listen(3001)

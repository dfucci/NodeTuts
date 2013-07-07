http=require 'http'
fs = require 'fs'
sys = require 'sys'
file_path=__dirname + '/cat.jpg'
fs.stat file_path, (err, stats)->
  http.createServer (req, res)->
    res.writeHead 200,{ 
      'Content-Type': 'image/jpeg',
      'Content-Length' : stats.size
    }
    rs=fs.createReadStream file_path
    sys.pump rs, res, (err)->
      if err
        throw err
#    rs.on 'data', (data)->
      #flushed = res.write data
      #if not flushed
        #rs.pause()
    #res.on 'drain', ()->
      #rs.resume();
    #rs.on 'end', ()->
      #res.end()
  .listen(3001)


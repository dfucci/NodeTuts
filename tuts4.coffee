http=require 'http'
fs = require 'fs'
sys = require 'sys'
step = require 'step'
file_size=0
file_content=''
file_path=__dirname + '/cat.jpg'
step(

  ()->
    fs.stat file_path,this

  (err, stat)->
    file_size=stat.size
    this()

  ()->
    fs.readFile file_path, this

  (err, file_content)->
    http.createServer (req, res)->
      res.writeHead 200,{ 
        'Content-Type': 'image/jpeg',
        'Content-Length' : file_size 
      }
      res.end file_content
    .listen(3001)
)


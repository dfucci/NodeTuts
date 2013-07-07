(function() {
  var file_path, fs, http, sys;
  http = require('http');
  fs = require('fs');
  sys = require('sys');
  file_path = __dirname + '/cat.jpg';
  fs.stat(file_path, function(err, stats) {
    return http.createServer(function(req, res) {
      var rs;
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': stats.size
      });
      rs = fs.createReadStream(file_path);
      return sys.pump(rs, res, function(err) {
        if (err) {
          throw err;
        }
      });
    }).listen(3001);
  });
}).call(this);

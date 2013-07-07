(function() {
  var file_content, file_path, file_size, fs, http, step, sys;
  http = require('http');
  fs = require('fs');
  sys = require('sys');
  step = require('step');
  file_size = 0;
  file_content = '';
  file_path = __dirname + '/cat.jpg';
  step(function() {
    return fs.stat(file_path, this);
  }, function(err, stat) {
    file_size = stat.size;
    return this();
  }, function() {
    return fs.readFile(file_path, this);
  }, function(err, file_content) {
    return http.createServer(function(req, res) {
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': file_size
      });
      return res.end(file_content);
    }).listen(3001);
  });
}).call(this);

(function() {
  var carrier, connections, net;
  net = require('net');
  carrier = require('carrier');
  connections = Array();
  net.createServer(function(conn) {
    var username;
    connections.push(conn);
    conn.on('close', function() {
      var pos;
      pos = connections.indexOf(conn);
      if (pos >= 0) {
        return connections.splice(pos, 1);
      }
    });
    conn.write('hello\n Who r u?\n');
    username = '';
    return carrier.carry(conn, function(line) {
      var feedback;
      if (username === '') {
        username = line;
        conn.write('hello ' + username + '\n');
        return;
      }
      if (line === 'quit') {
        conn.end();
        return;
      }
      feedback = username + ': ' + line + '\n';
      return connections.forEach(function(one_conn) {
        if (one_conn !== conn) {
          return one_conn.write(feedback);
        }
      });
    });
  }).listen(3001);
}).call(this);

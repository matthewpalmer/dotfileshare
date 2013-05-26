var fs = require('fs');
module.exports = function(path, server) {
    fs.readFile(path, function(err, data) {
    server.get(path, function(req, res) {
      //text/javascript might not be perfect
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  });
}


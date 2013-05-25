//USE HTTPS 
var fs = require('fs');
var privateKey = fs.readFileSync('privatekey.pem').toString();
var certificate = fs.readFileSync('certificate.pem').toString();

var restify = require('restify');

//My modules
var userModule = require('./userModule'),
    fileModule = require('./fileModule');

var server = restify.createServer({
  certificate: certificate,
  key: privateKey,
  name: 'MyApp'
});

server.get('/', function(req, res) {
  res.end('hey');
});

//User
server.get('/user/:id', function(req, res) {
  userModule.getUser(id, function(err, item) {
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200);
      console.log('found ', item);
      res.write(item);
      res.end();
    }
  });
});

server.listen(3000, function() {
  console.log('Server listening on port 3000');
});

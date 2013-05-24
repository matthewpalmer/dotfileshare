//USE HTTPS 
var fs = require('fs');
var privateKey = fs.readFileSync('privatekey.pem').toString();
var certificate = fs.readFileSync('certificate.pem').toString();


var restify = require('restify');

var server = restify.createServer({
  certificate: certificate,
  key: privateKey,
  name: 'MyApp'
});

server.get('/', function(req, res) {
  res.end('hey');
});

server.listen(3000, function() {
  console.log('Server listening on port 3000');
});

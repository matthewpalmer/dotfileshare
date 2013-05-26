var restify = require('restify'),
    fs = require('fs'),
    postdata = require('postdata');

//My modules
var userModule = require('./userModule'),
    fileModule = require('./fileModule');

var server = restify.createServer();
//WEBSITE
fs.readFile('frontend/file.html', function(err, data) {
  server.get('/f/:id', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

fs.readFile('frontend/index.html', function(err, data) {
  server.get('/', function(req, res) {
    res.writeHead(200);
    res.write(data);
    res.end();
  });
});
fs.readFile('frontend/scraper.js', function(err, data) {
  server.get('/scraper.js', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(data);
    res.end();
  });
});
fs.readFile('frontend/styles.css', function(err, data) {
  server.get('/styles.css', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(data);
    res.end();
  });
});
fs.readFile('frontend/mustache.js', function(err, data) {
  server.get('/mustache.js', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(data);
    res.end();
  });
});
fs.readFile('frontend/basil.css', function(err, data) {
  server.get('/basil.css', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(data);
    res.end();
  });
});
fs.readFile('frontend/upload.html', function(err, data) {
  server.get('/upload', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

server.get('/test', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var ob = {hey: 'one', two:'more'};
  res.write(JSON.stringify(ob));
  res.end();
});

//User
server.get('/user/:id', function(req, res) { 
  userModule.getUser(req.params.id, function(err, item) {
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200);
      res.write(item.toString());
      res.end();
    }
  }); 
});

server.post('/user', function(req, res) {
  postdata(req, res, function(err, data) {
    var name = data.name;
    userModule.createUser(name, function(err, item) {
      if (err) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(201);
        res.write(item.toString());
        res.end();
      }
    });
  });
});

server.put('/user/:id', function(req, res) {
  postdata(req, res, function(err, data) {
    console.log(req);
    var toAppend = data.appendFile;
    userModule.updateUser(req.params.id, toAppend, function(err, item) {
      if (err) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(202);
        res.write(item.toString());
        res.end();
      }
    });
   });
});


//API
//Files
server.get('/file/:id', function(req, res) { 
  fileModule.getFile(req.params.id, function(err, item) {
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200);
      res.write(JSON.stringify(item));
      res.end();
    }
  }); 
});

server.post('/file', function(req, res) {
  //console.log(req);
  postdata(req, res, function(err, data) {
    console.log(data);
    if (data.contents && data.title && data.author) {
      var file = data.contents;
      var title = data.title;
      var author = data.author;
      fileModule.createFile(file, title, author, function(err, item) {
      if (err) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(302, {'Location': '/f/'+item._id});
        res.end();
      }
    });
    } else {
      res.writeHead(404);
      res.end();
    }
    
  });
});

server.put('/file/:id', function(req, res) {
  postdata(req, res, function(err, data) {
    //console.log(req);
    var toAppend = data.file;
    console.log('to append is', data.file);
    fileModule.updateFile(req.params.id, toAppend,
      function(err, item) {
      if (err) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(202);
        res.write(JSON.stringify(item));
        res.end();
      }
    });
   });
});

server.put('/file/:id/star', function(req, res) {
  fileModule.starFile(req.params.id, function(err, item) {
    if (err) {
      console.log(err);
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200);
      res.write(JSON.stringify(item))
      res.end();
    }
  });
});

server.get('/files/popular', function(req, res) {
  fileModule.mostPopular(function(err, item) {
    res.writeHead(200);
    res.write(JSON.stringify(item));
    res.end();
  });
});

server.listen(process.env.PORT || 5000, function() {
  console.log('Server listening on port 5000');
});

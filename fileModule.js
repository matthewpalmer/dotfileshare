var mongoose = require('mongoose');
//Disable/Enable console.log for debugging

//Maybe the db stuff should go in its own module?
//Do our db init
/* ERR if two connections open
mongoose.connect('mongodb://localhost/dotfileshare');
var db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('opened');
});
*/

//Define our schema
var fileSchema = mongoose.Schema({
  contents: Buffer,
  stars: {type: Number, default: 0},
  title: String,
  author: String
});

var File = mongoose.model('File', fileSchema);

//API docs https://github.com/matthewpalmer/dotfileshare 
function getFile(id, callback) {
  File.find({_id: id}, function(err, item) {
    if (err) {
      console.log(err);
    } else {
     // console.log(item);
      callback(null, item);
    }
  });
}

function createFile(contentsString, title, author, callback) {
  var contentsBuffer = new Buffer(contentsString);
  var newFile = new File({contents: contentsBuffer, title: title,
  author: author});
  // console.log(newFile.contents);
  newFile.save(function(err, newFile) {
    if (err) {
      console.log(err);
    } else {
      // console.log(newFile);
      callback(null, newFile);
    }
  });
}

function updateFile(id, data, callback) {
  File.findOneAndUpdate({_id: id}, {contents: data},
    function(err, item) {
      if (err) {
        console.log(err);
      } else {
        // console.log(item);
        callback(null, item);
      }
    });
}

function starFile(id, callback) {
  File.findById(id, function(err, item) {
    var numStars = item.stars;
    numStars = numStars + 1;
    console.log('numstars is ', numStars);
    File.update({_id: id}, {stars: numStars}, function(err, item) {
      if (err) {
        console.log(err);
      } else {
        callback(null, numStars);
      }
    });
  });

}

function deleteFile(id, callback) {

}

//Undocumented, untested
function mostPopular(callback) {
  var query = File.find({});
  query.sort({stars: 'desc'}).limit(5);
  query.exec(function(err, item) {
    if (err) {
      console.log(err);
    } else {
      var listOfItems = item;
      //console.log(listOfItems);
      callback(null, listOfItems);
    }
  });
}

module.exports = {
  getFile: getFile,
  createFile: createFile,
  updateFile: updateFile,
  deleteFile: deleteFile,
  starFile: starFile,
  mostPopular: mostPopular
}

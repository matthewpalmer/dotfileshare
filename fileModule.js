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
  contents: Buffer
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

function createFile(contentsString, callback) {
  var contentsBuffer = new Buffer(contentsString);
  var newFile = new File({contents: contentsBuffer});
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

function deleteFile(id, callback) {

}


module.exports = {
  getFile: getFile,
  createFile: createFile,
  updateFile: updateFile,
  deleteFile: deleteFile
}

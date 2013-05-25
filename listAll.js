var mongoose = require('mongoose');
//Disable/Enable console.log for debugging

//Maybe the db stuff should go in its own module?
//Do our db init
// ERR if two connections open
/*
mongoose.connect('mongodb://localhost/dotfileshare');
var db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('opened');
});
*/
//Define our schema

function listAll(callback) {
  console.log('here');
  File.find({},function(err, item) {
    console.log('aa', err, item);
    callback(err, item);
  });
}
listAll(function(err, item) {
  console.log('was hehre');
});
module.exports = {
  listAll: listAll
}

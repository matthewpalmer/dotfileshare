var mongoose = require('mongoose');

//Maybe the db stuff should go in its own module?
//Do our db init
mongoose.connect('mongodb://nodejitsu:4dee563a276d93e726cf1d3de9445172@alex.mongohq.com:10016/nodejitsudb5195828548');
var db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('opened');
});

//Define our schema
var userSchema = mongoose.Schema({
  name: String,
  associatedFiles: Array
});

var User = mongoose.model('User', userSchema);

//API docs https://github.com/matthewpalmer/dotfileshare
function getUser(id, callback) {
  User.find({_id: id}, function(err, item) {
    if (err) {
      console.log(err);
    } else {
      console.log(item);
      callback(null, item);
    }
  });
}

function createUser(name, callback) {
  var newUser = new User({name: name});
  console.log(newUser.name);
  newUser.save(function(err, newUser) {
    if (err) {
      console.log(err);
    } else {
      console.log(newUser);
      callback(null, newUser);
    }
  });
}

function updateUser(id, data, callback) {
  User.findOneAndUpdate({_id: id}, {associatedFiles: data},
    function(err, item) {
      if (err) {
        console.log(err);
      } else {
        console.log(item);
        callback(null, item);
      }
    });
}

function deleteUser(id, callback) {

}


module.exports = {
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}

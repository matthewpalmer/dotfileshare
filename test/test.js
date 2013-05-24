var mocha = require('mocha'),
    expect = require('expect.js'),
    generaterandom = require('generaterandom');

//My modules
var userModule = require('../userModule'),
    fileModule = require('../fileModule');

describe('Get a user', function() {
  it('should get a user if valid id', function(done) {
    userModule.getUser('1', function(err, item) {
      expect(err).to.be(null); //Not sure if these are valid
      expect(item).to.be.ok();
      done();
    });
  });
  it('should create a new user', function(done) {
    userModule.createUser(generaterandom.string(10), function(err, item) {
      expect(err).to.be(null);
      expect(item).to.be.ok();
      done();
    });
  });
  it('should update a user', function(done) {
    userModule.updateUser('1', function(err, item) {
      expect(err).to.be(null);
      expect(item).to.be.ok();
      done();
    });
  });
  it('should delete a user', function(done) {
    userModule.deleteUser('1', function(err, item) {
      expect(err).to.be(null);
      expect(item).to.be.ok();
      done();
    });
  });
});

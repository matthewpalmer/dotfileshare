var mocha = require('mocha'),
    expect = require('expect.js'),
    generaterandom = require('generaterandom');

//My modules
var userModule = require('../userModule'),
    fileModule = require('../fileModule');

describe('USER', function() {
  it('should get a user if valid name', function(done) {
    userModule.getUser('519ffc7ac08508620c000001', function(err, item) {
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
    userModule.updateUser('519ffc7ac08508620c000001','someNewData',
      function(err, item) {
        expect(err).to.be(null);
        expect(item).to.be.ok();
        done();
      });
  });
  /*TODO: DELETE
  it('should delete a user', function(done) {
    userModule.deleteUser('1', function(err, item) {
      expect(err).to.be(null);
      expect(item).to.be.ok();
      done();
    });
  });
  */
});

describe('FILE', function() {
  it('should get a file if valid name', function(done) {
    fileModule.getFile('51a00f4d2e254cc01e000002', function(err, item) {
      expect(err).to.be(null); //Not sure if these are valid
      expect(item).to.be.ok();
      done();
    });
  });
  it('should create a new file', function(done) {
    fileModule.createFile(generaterandom.string(10), function(err, item) {
      expect(err).to.be(null);
      console.log(item.contents.toString());
      expect(item).to.be.ok();
      done();
    });
  });
  it('should update a file', function(done) {
    fileModule.updateFile('51a00f4d2e254cc01e000002',generaterandom.string(10),
      function(err, item) {
        expect(err).to.be(null);
        expect(item).to.be.ok();
        done();
      });
  });
  it('should star a file', function(done) {
    fileModule.starFile('51a00f4d2e254cc01e000002', function(err, item) {
      expect(err).to.be(null);
      expect(item).to.be.ok();
      done()
    });
  });
  it('should list the most popular files', function(done) {
    fileModule.mostPopular(function(err, item) {
      expect(err).to.be(null);
      expect(item).to.be.ok();
      done();
    });
  });
  /*TODO: DELETE
  it('should delete a file', function(done) {
    fileModule.deletefile('1', function(err, item) {
      expect(err).to.be(null);
      expect(item).to.be.ok();
      done();
    });
  });
  */
});

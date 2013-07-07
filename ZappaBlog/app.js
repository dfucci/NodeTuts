require('zappa')(function() {
  var Schema, User, mongoose;
  this.enable('default layout');
  mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/zappaDB');
  Schema = mongoose.Schema;
  User = new Schema({
    name: String
  });
  User = mongoose.model('User', User);
  this.get({
    '/': function() {
      var title, user;
      user = new User;
      user.name = "TED";
      user.save(function() {
        return console.log('inserted');
      });
      title = "Testing";
      return this.render({
        index: {
          user: user,
          title: title
        }
      });
    }
  });
  this.view({
    'index': function() {
      h1(this.title || 'View template');
      return p(this.user.name);
    }
  });
  this.get({
    '/user': function() {
      var user;
      user = mongoose.model('User');
      user.find({}, function(err, doc) {
        return console.log('retrived');
      });
      return this.render({
        user: {
          doc: doc
        }
      });
    }
  });
  return this.view({
    'user': function() {
      var s, _i, _len, _ref, _results;
      h1('Welcome');
      _ref = this.doc;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        _results.push(p(s.name));
      }
      return _results;
    }
  });
});
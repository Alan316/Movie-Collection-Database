var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var validateEmail = function(email) {
var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
return re.test(email)
};

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: 'Email Address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7
  },
  passwordConf: {
    type: String,
    required: true,
  },
  avatar: {
    type:String,
  },
  firstName: {
    type:String,
    required: true
  },
  lastName: {
    type: String,
  }
});

//authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
          var err1 = new Error('User not found.');
          //err.status = 401;
          return callback(err1);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      });
    });
};

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});


var User = mongoose.model('User', UserSchema);
module.exports = User;


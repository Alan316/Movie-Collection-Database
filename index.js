//Express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//MongoDB
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017';

//Set pat to Pug Templates
app.set('views', __dirname + '/views');

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
client.close();
});


//Mongoose
var mongoDB = 'mongodb://localhost/TEST';
mongoose.connect(mongoDB);
var db = mongoose.connection;
//Error Handling with Mongoose
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log ("The Mongoose is connected");
});


//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from template
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/images'));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.get('/', function(req,res) {
    res.sendFile('/index.html');
});

app.listen(3000, function() {
    console.log('This is working!');
});

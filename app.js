//Express
var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    session         = require('express-session'),
    MongoStore      = require('connect-mongo')(session);

// requiring routes
var indexRoutes = require('./routes/index');

//MongoDB - Connect to Database and Check for Errors
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017';
var mongoDB = 'mongodb://localhost/MovieLogue_User';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log ("The Mongoose is connected");
});
//Successful connection to MongoDB
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
client.close();
});

//Set View Engine and Path
app.set('view engine', 'pug');
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/images'));

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

// include routes
app.use("/", indexRoutes);
 
//catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

//Port is working on Localhost
app.listen(3000, function() {
    console.log('This is working!');
});

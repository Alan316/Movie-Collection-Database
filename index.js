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

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
client.close();
});


//Mongoose
var mongoDB = 'mongodb://localhost/TEST';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Error Handling with Mongoose
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log ("The Mongoose is connected");
});

//Static Files
app.use('/', express.static('public/'));
app.use('/', express.static('public/html'));
app.use('/', express.static('public/css'));
app.use('/', express.static('public/images'));
app.use('/', express.static('public/js'));
app.use('/', express.static('public/userprofile'));
app.use('/', express.static('db'));


app.get('/',(req,res) => res.sendFile('/index.html'));
app.listen(3000, () => console.log('This is working!'));


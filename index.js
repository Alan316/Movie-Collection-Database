//Express
var express = require('express');
var app = express();

//MongoDB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
client.close();
});

//Mongoose
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/TEST';
mongoose.connect(mongoDB)
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

app.use('/', express.static('public/html'));
app.use('/', express.static('public/css'));
app.use('/', express.static('public/images'));
app.use('/', express.static('public/js'));
app.use('/', express.static('db'));

app.get('/',(req,res) => res.sendFile('/index.html'));

app.listen(3000, () => console.log('This is working!'));

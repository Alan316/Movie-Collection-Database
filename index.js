//Express
var express = require('express');
var app = express();
//MongoDB
var mongo = require('mongodb');

app.use('/', express.static('public/html'));
app.use('/', express.static('public/css'));
app.use('/', express.static('public/images'));
app.use('/', express.static('public/js'));

app.get('/',(req,res) => res.sendFile('/index.html'))

app.listen(3000, () => console.log('This is working!'))


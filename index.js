var express = require('express');
var app = express();

app.use('/', express.static('public/html'));

app.get('/',(req,res) => res.sendFile('index.html'))

app.listen(3000, () => console.log('This is working!'))


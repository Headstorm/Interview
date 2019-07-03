var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var port = 5501;
app.listen(port);
console.log('server on http://127.0.0.1:5501');
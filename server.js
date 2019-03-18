/* eslint-disable */
var express = require('express');
var path = require('path');
var http = require('http');

var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '.')));

app.get('/', function rootRoute(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var httpServer = http.createServer(app);

httpServer.listen(port);

httpServer.on('error', function  onError(error) {
  console.log('Server Error: ', error);
});

httpServer.on('listening', function onListening() {
  console.log('Listening on port: ' + port);
});

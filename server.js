#!/usr/bin/env node

/**
Filename: server.js
Group name: Xtreme Dynamos
Date: November 11, 2021
 */

//Module Dependencies
var app = require('./server/config/app');
var debug = require('debug')('assignment1-comp229:server');
var http = require('http');

//Get Port From Environment and Store in Express
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Create HTTP Server
var server = http.createServer(app);

//Listen on Provided Port, on All Network Interfaces
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//Normalize a Port Into a Number, String, or False
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    //Named Pipe
    return val;
  }

  if (port >= 0) {
    //Port Number
    return port;
  }

  return false;
}

//Event Listener for HTTP Server "Error" Event
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  //Handle Specific Listen Errors with Friendly Messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//Event Listener for HTTP Server "Listening" Event
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

#!/usr/bin/env node

/**
 * Module dependencies.
 */

const debug = require('debug')('mpt:server');
const http = require('http');
const initialize = require('./init');
const app = require('./app');

initialize().then(() => {
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  const server = http.createServer(app);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', function(){
    const addr = this.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  });
}, (err) => {
  throw err
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
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
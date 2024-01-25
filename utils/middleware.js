// utils/middleware.js
const morgan = require('morgan');

// Use morgan middleware with the 'dev' format
const requestLogger = morgan('dev');

// Middleware for handling unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
};

module.exports = { requestLogger, unknownEndpoint };

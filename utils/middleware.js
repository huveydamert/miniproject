const morgan = require('morgan');

// Define a custom token to log request body
morgan.token('request-body', (request, response) => JSON.stringify(request.body));

// Use morgan middleware with the customized format
const requestLogger = morgan(':method :url :status :response-time ms - :response[content-length] :request-body');

// Middleware for handling unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
};

module.exports = { requestLogger, unknownEndpoint };

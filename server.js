const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const morgan = require('morgan'); // Import morgan
const app = express() // Creates an express application in app

// Use morgan middleware with the desired format
app.use(morgan('dev'));

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors()) // ALlows our server to receive data from same localhost
app.use(express.json()) // Allows our server to accept JSON data


/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
let currencies = [
  {
    id: 1,
    currencyCode: "CDN",
    country: "Canada",
    conversionRate: 1
  },
  {
    id: 2,
    currencyCode: "USD",
    country: "United States of America",
    conversionRate: 0.75
  }
]

// Initialize with the next available ID
let currencyIdCounter = 3;

/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
app.get('/', (request, response) => {
  response.send('Hello World!')
})

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
app.get('/api/currency/', (request, response) => {
  response.json(currencies)
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
app.get('/api/currency/:id', (request, response) => {
  const id = Number(request.params.id);
  const currency = currencies.find(currency => currency.id === id);
  
  if (currency) {
    response.json(currency);
  } else {
    response.status(404).json({ error: 'Currency not found'});
  }
})

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency
 * with data object enclosed
 * @responds by returning the newly created resource
 */
app.post('/api/currency', (request, response) => {
  console.log('Received POST request for currency');

  const { currencyCode, country, conversionRate } = request.body;

  //Check if required information is missing
  if (!currencyCode || !country || !conversionRate) {
    //If missing, send a 400 status and a message
    return response.status(400).json({ error: 'Content missing' });
  }

  const newCurrency = {
    id: currencyIdCounter++, // Assign a unique ID
    currencyCode,
    country,
    conversionRate
  };

  // Add the newly created currency to the data
  currencies.push(newCurrency);

  // Respond with the newly created currency object
  response.json(newCurrency);
})

/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
app.put('/api/currency/:id/:newRate', (request, response) => {
  const { id, newRate } = request.params; // Extract id and newRate from request.params
  const index = currencies.findIndex((currency) => currency.id === parseInt(id));

  if (index !== -1) {
    currencies[index].conversionRate = parseFloat(newRate); // Convert newRate to a number
    response.json(currencies[index]);
  } else {
    response.status(404).json({ error: "Currency not found" });
  }
});


/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id/,
 * @responds by returning a status code of 204
 */
app.delete('/api/currency/:id/', (request, response) => {
  const id = Number(request.params.id);
  const currency1 = currencies.filter(currency => currency.id != id)

  response.json(currency1)
  response.status(204).end();
});

// Middleware for unknown endpoint
// Any request that isn't caught by the above ones will 'fall' into this
app.use((request, response, next) => {
  console.log('Unknown endpoint');
  response.status(404).json({ error: 'unknown endpoint' });
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
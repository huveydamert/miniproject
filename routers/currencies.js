// routers/currencies.js
const express = require('express');
const router = express.Router();

let currencies = [
  {
    id: 1,
    currencyCode: 'CDN',
    country: 'Canada',
    conversionRate: 1,
  },
  {
    id: 2,
    currencyCode: 'USD',
    country: 'United States of America',
    conversionRate: 0.75,
  },
];

let currencyIdCounter = 3;

// GET /api/currency/
router.get('/', (request, response) => {
  response.json(currencies);
});

// GET /api/currency/:id
router.get('/:id', (request, response) => {
  const id = Number(request.params.id);
  const currency = currencies.find((currency) => currency.id === id);

  if (currency) {
    response.json(currency);
  } else {
    response.status(404).json({ error: 'Currency not found' });
  }
});

// POST /api/currency
router.post('/', (request, response) => {
  console.log('Received POST request for currency');

  const { currencyCode, country, conversionRate } = request.body;

  if (!currencyCode || !country || !conversionRate) {
    return response.status(400).json({ error: 'Content missing' });
  }

  const newCurrency = {
    id: currencyIdCounter++,
    currencyCode,
    country,
    conversionRate,
  };

  currencies.push(newCurrency);
  response.json(newCurrency);
});

// PUT /api/currency/:id/:newRate
router.put('/:id/:newRate', (request, response) => {
  const { id, newRate } = request.params;
  const index = currencies.findIndex((currency) => currency.id === parseInt(id));

  if (index !== -1) {
    currencies[index].conversionRate = parseFloat(newRate);
    response.json(currencies[index]);
  } else {
    response.status(404).json({ error: 'Currency not found' });
  }
});

// DELETE /api/currency/:id
router.delete('/:id', (request, response) => {
  const id = Number(request.params.id);
  const currencyIndex = currencies.findIndex(currency => currency.id === id);

  if (currencyIndex !== -1) {
    const deletedCurrency = currencies.splice(currencyIndex, 1)[0]; // Remove the currency from the array and get the deleted currency
    response.status(204).json(deletedCurrency); // Send the deleted currency with status 204
  } else {
    response.status(404).json({ error: 'Currency not found' }); // Send 404 if currency with given ID is not found
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Currency = require("../models/currency-model");

// Define the default currencies array
const defaultCurrencies = [
  { currencyCode: 'CDN', countryId: 1, conversionRate: 1 },
  { currencyCode: 'USD', countryId: 2, conversionRate: 0.75 },
];

// GET /api/currency/
router.get('/', async (request, response) => {
  console.log(('Received GET request'))
  try {
    const defaultCurrencies = await Currency.findAll();
    response.json(defaultCurrencies);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/currency/:id
router.get('/:id', async (request, response) => {
  const id = Number(request.params.id);
  try {
    const currency = await Currency.findByPk(id);
    if (currency) {
      response.json(currency);
    } else {
      response.status(404).json({ error: 'Currency not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/currency
router.post('/', async (request, response) => {
  console.log('Received POST request for currency');

  const { currencyCode, countryId, conversionRate } = request.body;

  if (!currencyCode || !countryId || !conversionRate) {
    return response.status(400).json({ error: 'Content missing' });
  }

  try {
    const newCurrency = await Currency.create({
      currencyCode: currencyCode,
      countryId: countryId,
      conversionRate: conversionRate,
    });
    response.json(newCurrency);
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/currency/:id/:newRate
router.put('/:id/:newRate', async (request, response) => {
  const { id, newRate } = request.params;
  try {
    const currency = await Currency.findByPk(id);
    if (currency) {
      currency.conversionRate = parseFloat(newRate);
      await currency.save();
      response.json(currency);
    } else {
      response.status(404).json({ error: 'Currency not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/currency/:id
router.delete('/:id', async (request, response) => {
  const id = Number(request.params.id);
  try {
    const currency = await Currency.findByPk(id);
    if (currency) {
      await currency.destroy();
      response.status(204).end();
    } else {
      response.status(404).json({ error: 'Currency not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

//Asked Chat GPT
// Add default countries to the database
router.post('/init-defaults', async (request, response) => {
  try {
    await Currency.bulkCreate(defaultCurrencies);
    response.status(201).json({ message: 'Default currencies added successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
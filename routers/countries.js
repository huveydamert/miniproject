const express = require('express');
const router = express.Router();
const Country = require("../models/country-model");

// Define the default countries array
const defaultCountries = [
  { name: 'Canada' },
  { name: 'USA' },
];


// GET /api/country/
router.get('/get', async (request, response) => {
  try {
    const countries = await Country.findAll();
    response.json(defaultCountries);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/country/add - Add a new country
router.post('/add', async (request, response) => {
  const { name } = request.body;

  if (!name) {
    return response.status(400).json({ error: 'Name missing' });
  }

  try {
    const newCountry = await Country.create({ name });
    response.json(newCountry);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/country/:id - Delete a country by ID
router.delete('/:id', async (request, response) => {
  const id = Number(request.params.id);
  try {
    const country = await Country.findByPk(id);
    if (country) {
      await country.destroy();
      response.status(204).end();
    } else {
      response.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

//Asked Chat GPT
// Add default countries to the database
router.post('/init-defaults', async (request, response) => {
  try {
    await Country.bulkCreate(defaultCountries);
    response.status(201).json({ message: 'Default countries added successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

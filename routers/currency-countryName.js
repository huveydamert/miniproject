const express = require('express');
const router = express.Router();
const Currency = require("../models/currency-model");
const Country = require("../models/country-model");


// Define the GET endpoint for "/currency-countryName"
router.get('/', async (request, response) => {
  try {
    console.log('GET request received');
    // Query the Currency model and include the Country model
    const currencies = await Currency.findAll({
      include: [{
        model: Country,
        attributes: ['name']
      }],
    });

    //Asked Chat GPT
    // Extract currency code and country name from the query result
    const currencyCountryNames = currencies.map(currency => ({
      currencyCode: currency.currencyCode,
      countryName: currency.Country.name,
    }));

    // Log the query result
    console.log(currencyCountryNames);

    // Send the response with currency code and country name
    response.json(currencyCountryNames);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router
module.exports = router;

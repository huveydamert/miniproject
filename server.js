//Import require modules
const express = require('express');
require("dotenv").config();
const cors = require('cors');
const morgan = require('morgan');
const currenciesRouter = require('./routers/currencies');
const countriesRouter = require('./routers/countries');
const currencyCountryNameRouter = require('./routers/currency-countryName');
const middleware = require('./utils/middleware');
const sequelize = require("./config/sequelize");
const Country = require('./models/country-model');
const Currency = require('./models/currency-model');

//Create Express application
const app = express();

//Define middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(middleware.requestLogger);
app.use('/api/currency', currenciesRouter);
app.use('/api/country', countriesRouter);
app.use('/api/currency-countryName', currencyCountryNameRouter);
app.use(middleware.unknownEndpoint);


//The server is listening
const PORT = process.env.PORT;

sequelize.sync({ alter: true })
 .then(() => {
  console.log("Database is synced");

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
})
.catch((error) => {
  console.error("Error in syncing the database: ", error);
})


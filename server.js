const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const currenciesRouter = require('./routers/currencies');
const middleware = require('./utils/middleware');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/currency', currenciesRouter);
app.use(middleware.unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

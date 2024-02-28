const express = require('express');
const rootRouter = require('./routes/rootRouter');
const {errorHandler} = require('./errorHandler');

const app = express();
const bodyParser = express.json();

app.use(bodyParser);
app.use(errorHandler);
app.use('/api', rootRouter);

module.exports = app;
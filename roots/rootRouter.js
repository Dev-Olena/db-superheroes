const express = require('express');
const heroRouter = require('./heroRouter');

const rootRouter = express.Router();

rootRouter.use('/superheroes', heroRouter);

module.exports = rootRouter;
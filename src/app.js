const express = require('express');

const authRoutes = require('./routes/auth.routes');

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/api/auth', authRoutes);

app.use(errorHandler);

module.exports = app;

const express = require('express');
const app = express();
const logger = require('./config/logger');
const bodyParser = require('body-parser');
const duckRouter = require('./routes/ducks');
const urlRouter = require('./routes/users');
const { userUrl, duckUrl } = require('./config/config.json');
const port = process.env.PORT || 4494;
const createError = require('http-errors');

app.use(logger);

app.use(bodyParser.json());

app.use(duckUrl, duckRouter);

app.use(userUrl, urlRouter);

app.use('*', (req, res, next) => {
    next(createError(404, 'Resource not found'));
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.message || "You must construct additional testing.");
});

const server = app.listen(port, () => {
    console.log(`Server started successfully on port ${server.address().port}`);
});

module.exports = server;
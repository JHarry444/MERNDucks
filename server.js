const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const trainerRoutes = require('./routes/trainers');
const { trainerUrl } = require('./consts.json');
const port = process.env.PORT || 4494;

app.use(bodyParser.json());

app.use((req, res, next) => {
    const logEntry =
        `
    host: ${req.hostname}
    ip: ${req.ip}
    method: ${req.method}
    path: ${req.path}
    time: ${new Date()}`;
    console.log(logEntry);
    next();
});

app.use(trainerUrl, trainerRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    next(err);
});

app.use((err, req, res, next) => {
    console.log("weapon");
    res.status(500).send(err.message || "You must construct additional testing.");
});

const server = app.listen(port, () => {
    console.log(`Server started successfully on port ${server.address().port}`);
});

module.exports = server;
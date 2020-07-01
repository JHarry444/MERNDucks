const fs = require('fs');
const morgan = require('morgan');

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(`${process.env.LOG_DIR || '.'}/access.log`, { flags: 'a' })

// setup the logger
const logger = morgan('dev', { stream: accessLogStream });

module.exports = logger;
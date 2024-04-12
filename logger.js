var Logger = require('node-json-logger');
var fs = require('fs');
var dotenv = require('dotenv');
var configDotenv = require('dotenv').config;

configDotenv();
var logger;

if (process.env.test === 'Testenv') {
    logger = new Logger();
} else {
    //var filePath = process.env.LOG_FILE_PATH || 'myapp.log';
     var filePath = process.env.LOG_FILE_PATH || '/var/log/myapp.log';
    var logStream = fs.createWriteStream(filePath, { flags: 'a' });
    logger = new Logger({ stream: logStream });

    // Redirecting stdout and stderr to logStream
    process.stdout.write = logStream.write.bind(logStream);
    process.stderr.write = logStream.write.bind(logStream);
}

module.exports = logger;
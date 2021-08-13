/* eslint-disable global-require */

// important!!!
// copy the config-template and rename to default.json

const rdapplogger = require('@rdapp/node-logger');
const express = require('express');
const path = require('path');
const config = require('config');

const app = express();

const appName = 'example';

rdapplogger({ appName, logDirectory: path.join(__dirname, 'log'), app });

logger.info(`${trace()} [start app...:%j]`, {});
logger.info(`${trace()} [%j]`, { nice: `hello ${appName}....`, version: require('./package.json').version });

logger.info(`${trace()} [config:%j]`, config.get('server'));

require('./startup/cors')(app);
require('./startup/router')(app);

const port = process.env.PORT || 28888;
app.listen(port, () => logger.info(`${trace()} [Listening on port ${port}...:%j]`, {}));

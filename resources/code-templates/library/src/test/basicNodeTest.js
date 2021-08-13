/* eslint-disable global-require */

// important!!!
// copy the config-template and rename to default.json

const rdapplogger = require('@rdapp/node-logger');
const path = require('path');
const Example = require('../index');

const appName = 'basicNodeTest';

rdapplogger({ appName, logDirectory: path.join(__dirname, 'log') });

logger.info(`${trace()} [start app...:%j]`, {});
logger.info(`${trace()} [%j]`, {
    nice: `hello ${appName}....`,
    version: require('../../package.json').version,
});

async function start() {
    const example = new Example({ rdappnodelogger: logger });
    const result = await example.init();
    logger.debug(`${trace()} [init result:%j]`, result);

    const jobInfo = {
        Name: 'eventinfluences',
        Paramater: {},
    };
    const result2 = await example.executeJob({ jobInfo });
    logger.debug(`${trace()} [result2:%j]`, result2);
}

start();

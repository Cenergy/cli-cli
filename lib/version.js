const figlet = require('figlet');
const chalk = require('chalk');
const semver = require('semver');
const requiredVersion = require('../package.json').engines.node;

function checkNodeVersionCore(wanted, id) {
    if (!semver.satisfies(process.version, wanted)) {
        console.log(
            chalk.red(
                `You are using Node ${process.version}, but this version of ${id} requires Node ${wanted}.\nPlease upgrade your Node version.`
            )
        );
        process.exit(1);
    }
    if (semver.satisfies(process.version, '9.x')) {
        console.log(
            chalk.red(
                `You are using Node ${process.version}.\n` +
                    // eslint-disable-next-line max-len
                    `Node.js 9.x has already reached end-of-life and will not be supported in future major releases.\n` +
                    `It's strongly recommended to use an active LTS version instead.`
            )
        );
    }
}

function check() {
    checkNodeVersionCore(requiredVersion, 'rdapp-cli');
}

const version = chalk.blue(figlet.textSync('RDAPP CLI', { horizontalLayout: 'full' }));
// eslint-disable-next-line global-require
const version1 = `V${require('../package').version}-Alpha`;

const version2 = chalk.blue(figlet.textSync(version1, { horizontalLayout: 'full' }));

module.exports = {
    check,
    cliVersion: `${version}\n${version2}`,
};

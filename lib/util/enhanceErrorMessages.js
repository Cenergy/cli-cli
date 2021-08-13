const program = require('commander');
const chalk = require('chalk');

module.exports = (methodName, log) => {
    // eslint-disable-next-line func-names
    program.Command.prototype[methodName] = function(...args) {
        if (methodName === 'unknownOption' && this._allowUnknownOption) {
            return;
        }
        this.outputHelp();
        console.log(`  ${chalk.red(log(...args))}`);
        console.log();
        process.exit(1);
    };
};

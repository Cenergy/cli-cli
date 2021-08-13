#!/usr/bin/env node

/* eslint-disable global-require */

// Check node version before requiring/doing anything else
// The user may be on a very old node version

const chalk = require('chalk');
const program = require('commander');
const version = require('../lib/version');
const cleanArgs = require('../lib/util/cleanArgs');

version.check();

program.version(version.cliVersion).usage('<command> [options]');

program
    .command('code')
    .description(
        'create code configurations like .prettierrc .eslintrc.js .eslintignore .gitignore and vscode settings'
    )
    .option('-e, --eslint', 'add .eslintrc.js and .eslintignore')
    .option('-g, --gitignore', 'add .gitignore')
    .option('-s, --settings', 'add vscode settings')
    .option('-p, --prettier', '.prettierrc')
    .option('-a, --all', 'all the configurations')
    .action(cmd => {
        const options = cleanArgs(cmd);
        require('../lib/code')(options);
    });

program
    .command('template')
    .description('create code template for node(express,library) and vue projects')
    .option('-e, --express', 'create express project')
    .option('-l, --library', 'create licrary project')
    .option('-v, --vue', 'create vue project')
    .option('-t, --vueVisualization', 'create vue project, and integrate tailwind.css')
    .option('-b, --vueBackstage', 'create vue backstage project, and integrate tailwind.css')
    .action(cmd => {
        const options = cleanArgs(cmd);
        require('../lib/template')(options);
    });

program
    .command('site')
    .description('show the rdapp site addresses')
    .action(cmd => {
        const options = cleanArgs(cmd);
        require('../lib/site')(options);
    });

// output help information on unknown commands
program.arguments('<command>').action(cmd => {
    program.outputHelp();
    console.log(`  ${chalk.red(`Unknown command ${chalk.yellow(cmd)}.`)}`);
    console.log();
});

// add some useful info on help
program.on('--help', () => {
    console.log();
    console.log(
        `  Run ${chalk.cyan(`rdapp <command> --help`)} for detailed usage of given command.`
    );
    console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

// enhance common error messages
const enhanceErrorMessages = require('../lib/util/enhanceErrorMessages');

enhanceErrorMessages('missingArgument', argName => {
    return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`;
});

enhanceErrorMessages('unknownOption', optionName => {
    return `Unknown option ${chalk.yellow(optionName)}.`;
});

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
    return `Missing required argument for option ${chalk.yellow(option.flags)}${
        flag ? `, got ${chalk.yellow(flag)}` : ``
    }`;
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

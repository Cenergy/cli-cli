const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const run = require('./util/runCommand');
const { logWithSpinner, stopSpinner } = require('./util/spinner');

function addEslintPackages(installPackages, action) {
    if (action === 'vue') {
        installPackages.push('@vue/eslint-config-airbnb');
        installPackages.push('prettier');        
    } else if (action === 'node') {
        installPackages.push('eslint');
        installPackages.push('eslint-config-airbnb-base');
        installPackages.push('eslint-config-prettier');
        installPackages.push('eslint-plugin-import');
    } else {
        installPackages.push('eslint');
        installPackages.push('eslint-config-airbnb-base');
        installPackages.push('eslint-config-prettier');
        installPackages.push('eslint-plugin-html');
        installPackages.push('eslint-plugin-import');
    }
}

async function code(options) {
    console.log('rd: code -> options', options);
    const { action } = await inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: `select the project type:`,
            choices: [
                { name: 'Vue', value: 'vue' },
                { name: 'Node', value: 'node' },
                { name: 'SimpleWeb', value: 'simple-web' },
            ],
        },
    ]);
    if (!action) {
        console.log('env', process.env);
        console.log('config', process.config);
        console.log('argv', process.argv);
        console.log('arch', process.arch);
        return;
    }
    console.log('rd: code -> action', action);
    const resourcesPath = path.join(
        process.argv[1],
        '../..',
        'resources',
        'code-configurations',
        action
    );
    console.log('rd: code -> resourcesPath', resourcesPath);
    const targetDir = path.resolve(process.cwd());
    console.log('rd: code -> targetDir', targetDir);

    logWithSpinner(
        `✨ Creating ${chalk.yellow(action)} project configurations in ${chalk.cyan(targetDir)}\n`
    );

    const installPackages = [];
    if (options.all) {
        await fs.copy(resourcesPath, targetDir);
        addEslintPackages(installPackages, action);
    } else {
        if (options.eslint) {
            await fs.copy(
                path.join(resourcesPath, '.eslintrc.js'),
                path.join(targetDir, '.eslintrc.js')
            );
            await fs.copy(
                path.join(resourcesPath, '.eslintignore'),
                path.join(targetDir, '.eslintignore')
            );
            addEslintPackages(installPackages, action);
        }
        if (options.gitignore) {
            await fs.copy(
                path.join(resourcesPath, '.gitignore1'),
                path.join(targetDir, '.gitignore')
            );
        }
        if (options.settings) {
            await fs.copy(path.join(resourcesPath, '.vscode'), path.join(targetDir, '.vscode'));
        }
        if (options.prettier) {
            await fs.copy(
                path.join(resourcesPath, '.prettierrc'),
                path.join(targetDir, '.prettierrc')
            );
        }
    }
    if (installPackages.length > 0) {
        const isPackageInit = await fs.exists(path.join(targetDir, 'package.json'));
        if (!isPackageInit) {
            await run('npm', ['init', '--yes'], targetDir);
        }
        await run('npm', ['i', ...installPackages, '-D'], targetDir);
    }
    stopSpinner();
    console.log(`🎉 Successfully created ${chalk.yellow(action)} project configurations.`);
}

module.exports = (...args) => {
    return code(...args).catch(err => {
        console.error(chalk.red.dim(`Error: ${err}`));
        stopSpinner();
    });
};

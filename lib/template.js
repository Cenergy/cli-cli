const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { logWithSpinner, stopSpinner } = require('./util/spinner');

async function copyDir(from, to) {
    console.log(chalk.magenta(`🏇 copy ${from} `));
    await fs.ensureDir(to);
    await fs.copy(from, to);
}

async function template(options) {
    console.log('rd: template -> options', options);
    const templatePathPrefix = path.join(process.argv[1], '../..', 'resources', 'code-templates');
    console.log('rd: template-> templatePathPrefix', templatePathPrefix);
    const targetDir = path.resolve(process.cwd());
    console.log('rd: template-> targetDir', targetDir);

    if (options.vue) {
        logWithSpinner(
            `✨ Creating ${chalk.yellow('vue')} project template in ${chalk.cyan(targetDir)}\n`
        );
        await copyDir(path.join(templatePathPrefix, 'vue'), path.join(targetDir));
    }
    if (options.express) {
        logWithSpinner(
            `✨ Creating ${chalk.yellow('express')} project template in ${chalk.cyan(targetDir)}\n`
        );
        await copyDir(path.join(templatePathPrefix, 'express'), path.join(targetDir));
    }
    if (options.library) {
        logWithSpinner(
            `✨ Creating ${chalk.yellow('library')} project template in ${chalk.cyan(targetDir)}\n`
        );
        await copyDir(path.join(templatePathPrefix, 'library'), path.join(targetDir));
    }
    if (options.vueVisualization) {
        logWithSpinner(
            `✨ Creating ${chalk.yellow('vueVisualization')} project template in ${chalk.cyan(
                targetDir
            )}\n`
        );
        await copyDir(path.join(templatePathPrefix, 'vueVisualization'), path.join(targetDir));
    }
    if (options.vueBackstage) {
        logWithSpinner(
            `✨ Creating ${chalk.yellow('vueBackstage')} project template in ${chalk.cyan(
                targetDir
            )}\n`
        );
        await copyDir(path.join(templatePathPrefix, 'vueBackstage'), path.join(targetDir));
    }
    await fs.move(path.join(targetDir, '.gitignore1'), path.join(targetDir, '.gitignore'), {
        overwrite: true,
    });
    stopSpinner();
    console.log(`🎉 Successfully created project template.`);
}

module.exports = (...args) => {
    return template(...args).catch(err => {
        console.error(chalk.red.dim(`Error: ${err}`));
        stopSpinner();
    });
};

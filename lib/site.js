const chalk = require('chalk');
const terminalLink = require('terminal-link');

// eslint-disable-next-line no-unused-vars
async function site(options) {
    let link = terminalLink('rdapp-业软导航', 'http://www.rdapp.genew.cn');
    console.log(link);
    link = terminalLink('wowonder-汪汪队', 'http://wowonder.rdapp.com');
    console.log(link);
    link = terminalLink('storage-业软网盘', 'http://storage.rdapp.com');
    console.log(link);
    link = terminalLink('code-代码片段', 'http://code.rdapp.com');
    console.log(link);
    link = terminalLink('shortener-短链接', 'http://shortener.rdapp.com');
    console.log(link);
    link = terminalLink('gitlab-代码库', 'http://git.rdapp.com');
    console.log(link);
    link = terminalLink('sinopia-私仓', 'http://registry.npm.rdapp.com');
    console.log(link);
}

module.exports = (...args) => {
    return site(...args).catch(err => {
        console.error(chalk.red.dim(`Error: ${err}`));
    });
};

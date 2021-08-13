const execa = require('execa');

module.exports = async function run(command, args, targetDir) {
    const { stdout } = await execa(command, args, { cwd: targetDir });
    console.log(stdout);
};

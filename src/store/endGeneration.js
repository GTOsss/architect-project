const chalk = require('chalk');
const { createEvent } = require('./rootDomain');

const endGeneration = createEvent();

endGeneration.watch(() => console.log(chalk.green('Success')));

module.exports = { endGeneration };

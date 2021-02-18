#!/usr/bin/env node
const packageJson = require('../package.json');
const commander = require('commander'),
  chalk = require('chalk');
const arc = require('./main');

// cli
commander.version(packageJson.version).description('Configuration files creator.');

commander
  .command('start')
  .alias('s')
  .description('Start architect-project generation')
  .action(() => {
    arc();
    console.log(chalk.green('\n Success'));
  });

commander.parse(process.argv);

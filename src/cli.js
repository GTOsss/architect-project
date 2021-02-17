#!/usr/bin/env node
const commander = require('commander'),
  { prompt } = require('inquirer'),
  chalk = require('chalk');
const arc = require('./main');

// cli
commander.version('1.0.0').description('Configuration files creator.');

commander
  .command('start')
  .alias('s')
  .description('Start architect-project generation')
  .action(() => {
    arc();
    console.log(chalk.green('\n Success'));
  });

commander.parse(process.argv);

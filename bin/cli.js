#!/usr/bin/env node

const packageJson = require('../package.json');
const commander = require('commander'),
  { prompt } = require('inquirer'),
  chalk = require('chalk');
const { arcWithEslint } = require('../src/main');
const { changeOutput, changeOutputWithEslint, startWatcher, arcStart } = require('../src/functions');

// cli
commander.version(packageJson.version).description('Configuration files creator.');
commander.option('-w, --watch', 'use watcher');

const options = commander.opts();

commander
  .command('eslint')
  .option('-w', 'Watcher')
  .alias('e')
  .description('Start architect-project generation with EsLint')
  .action(() => {
    if (options.watch) {
      startWatcher(changeOutputWithEslint);
    } else {
      arcWithEslint();
    }

    console.log(chalk.green('Success'));
  });

commander
  .command('start')
  .alias('s')
  .description('Start architect-project generation')
  .action(() => {
    if (options.watch) {
      arcStart('Starting architect...');
      startWatcher(changeOutput);
    } else {
      arcStart('Starting architect...');
    }
    console.log(chalk.green('Success'));
  });

commander.parse(process.argv);

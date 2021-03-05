#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const {
  startWatcherWithEslint,
  startWatcher,
  arcStart,
  arcStartWithEslint,
  watchTemplateSettings,
} = require('../src/functions');
const { getSourceMaps } = require('../src/functions/getSourceMap');
const packageJson = require('../package.json');

// cli
commander.version(packageJson.version).description('Configuration files creator.');
commander.option('-w, --watch', 'use watcher');

const options = commander.opts();

// watcher

const actionWatcher = (sourceMap) => {
  if (options.watch) {
    console.log('Watcher running...');
    arcStartWithEslint({ sourcesMap: sourceMap });
    startWatcherWithEslint();
    watchTemplateSettings();
  } else {
    arcStartWithEslint({ sourcesMap: sourceMap });
  }

  console.log(chalk.green('Success'));
};

commander
  .command('eslint')
  .option('-w', 'Watcher')
  .alias('e')
  .description('Start architect-project generation with ESLint')
  .action(() => {
    console.log(chalk.yellow('Starting architect with ESLint...'));
    const { sourceMapModule, sourceMapAtomAsModule } = getSourceMaps();
    console.log('Reading source-map-module...');
    actionWatcher(sourceMapModule);
    console.log('Reading source-map-atom...');
    actionWatcher(sourceMapAtomAsModule);
  });

// start

const actionStart = (sourceMap) => {
  if (options.watch) {
    console.log('Watcher running...');
    arcStart({ sourcesMap: sourceMap });
    startWatcher();
    watchTemplateSettings();
  } else {
    arcStart({ sourcesMap: sourceMap });
  }
  console.log(chalk.green('Success'));
};

commander
  .command('start')
  .alias('s')
  .description('Start architect-project generation')
  .action(() => {
    console.log(chalk.yellow('Starting architect...'));
    const { sourceMapModule, sourceMapAtomAsModule } = getSourceMaps();
    // console.log('Reading source-map-module...');
    // actionStart(sourceMapModule);
    console.log('Reading source-map-atom...');
    actionStart(sourceMapAtomAsModule);
  });

commander.parse(process.argv);

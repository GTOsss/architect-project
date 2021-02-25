#!/usr/bin/env node

const packageJson = require('../package.json');
const fs = require('file-system');
const commander = require('commander'),
  { prompt } = require('inquirer'),
  chalk = require('chalk');
const {
  startWatcherWithEslint,
  startWatcher,
  arcStart,
  arcStartWithEslint,
  watchTemplateSettings,
} = require('../src/functions');
const configPath = require('../src/configPath');

// switcher
const ifExistSourceMapPath = fs.existsSync(configPath.sourcesMapTxtPath);
const sourcesMap = ifExistSourceMapPath
  ? require('../src/functions/parseSourceMap')
  : require(configPath.sourcesMapJsPath);

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
      arcStartWithEslint({ str: 'Starting architect with EsLint & watcher...', sourcesMap });
      startWatcherWithEslint();
      watchTemplateSettings();
    } else {
      arcStartWithEslint({ str: 'Starting architect with EsLint...', sourcesMap });
    }

    console.log(chalk.green('Success'));
  });

commander
  .command('start')
  .alias('s')
  .description('Start architect-project generation')
  .action(() => {
    if (options.watch) {
      arcStart({ str: 'Starting architect with watcher...', sourcesMap });
      startWatcher();
      watchTemplateSettings();
    } else {
      arcStart({ str: 'Starting architect...', sourcesMap });
    }
    console.log(chalk.green('Success'));
  });

commander.parse(process.argv);

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
// const createAndCashSourceMapAtom = require('../src/utils/createAndCashSourceMapAtom');
// const createAndCashSourceMapModule = require('../src/utils/createAndCashSourceMapModule');

const { createAndCashSourceMapModule, createAndCashSourceMapAtom } = require('../src/utils/createAndCashSourceMap');

// cli
commander.version(packageJson.version).description('Configuration files creator.');
commander.option('-w, --watch', 'use watcher');
commander.option('-e, --eslint', 'use esLint');
commander.option('-mta, --module_to_atom', 'from module to atom');
commander.option('-atm, --atom_to_module', 'from atom to module');

const options = commander.opts();

// esLint

const actionEsLint = (sourceMap) => {
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
    if (options.eslint) {
      console.log(chalk.yellow('Starting architect with ESLint...'));
      const { sourceMapModule, sourceMapAtomAsModule } = getSourceMaps();

      if (sourceMapModule) {
        actionEsLint(sourceMapModule);
        console.log('Reading source-map-module...');
      }
      if (sourceMapAtomAsModule) {
        actionEsLint(sourceMapAtomAsModule);
        console.log('Reading source-map-atom...');
      }

      return;
    }

    console.log(chalk.yellow('Starting architect...'));
    const { sourceMapModule, sourceMapAtomAsModule } = getSourceMaps();

    if (sourceMapModule) {
      actionStart(sourceMapModule);
      console.log('Reading source-map-module...');
    }
    if (sourceMapAtomAsModule) {
      actionStart(sourceMapAtomAsModule);
      console.log('Reading source-map-atom...');
    }
  });

commander
  .command('convert')
  .alias('con')
  .description('Convert source-map')
  .action(() => {
    if (options.module_to_atom) {
      createAndCashSourceMapAtom();
    }
    if (options.atom_to_module) {
      createAndCashSourceMapModule();
    }
  });

commander.parse(process.argv);

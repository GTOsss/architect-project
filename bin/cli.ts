#!/usr/bin/env ts-node
import '../src/store/index';
import configPath from '../src/configPath';
import { getSourceMaps } from '../src/functions';
import commander from 'commander';
import chalk from 'chalk';
import packageJson from '../package.json';

// import { redoingChanges, undoingChanges } from '../src/utils/change/doChanges';

const {
  createAndCashSourceMapModule,
  createAndCashSourceMapAtom,
} = require('../src/utils/change/createAndCashSourceMap');

const { callFunctionWithCurrentSourceMap, actionStart, actionEsLint } = require('./utils');
// cli
commander.version(packageJson.version).description('Configuration files creator.');
commander.option('-w, --watch', 'use watcher');
commander.option('-e, --eslint', 'use esLint');
commander.option('-mta, --module_to_atom', 'from module to atom');
commander.option('-atm, --atom_to_module', 'from atom to module');
commander.option('-u, --undo', 'undoing changes');
commander.option('-r, --redo', 'redoing changes');
commander.option('-c, --config <path>', 'path of the configuration to use');

const options = commander.opts();

commander
  .command('start')
  .alias('s')
  .description('Start architect-project generation')
  .action(() => {
    if (options.config) {
      configPath.settingsFolder = options.config;
    }

    const { sourceMapModule, sourceMapAtomAsModule } = getSourceMaps();

    if (options.eslint) {
      console.log(chalk.yellow('Starting architect with ESLint...'));
      callFunctionWithCurrentSourceMap({ sourceMapModule, sourceMapAtomAsModule, callback: actionEsLint, options });
      return;
    }

    console.log(chalk.yellow('Starting architect...'));
    callFunctionWithCurrentSourceMap({ sourceMapModule, sourceMapAtomAsModule, callback: actionStart, options });
  });

//convert

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

//change

// commander
//   .command('change')
//   .description('Undoing and Redoing Changes')
//   .action(() => {
//     if (options.undo) {
//       undoingChanges();
//     }
//     if (options.redo) {
//       redoingChanges();
//     }
//   });

commander.parse(process.argv);
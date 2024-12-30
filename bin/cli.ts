#!/usr/bin/env tsx
import '../src/store/index';
import commander from 'commander';
// import chalk from 'chalk';
import packageJson from '../package.json';
import { arcStart } from '../src/functions';

// import { redoingChanges, undoingChanges } from '../src/utils/change/doChanges';

// import { actionEsLint, actionStart, callFunctionWithCurrentSourceMap } from './utils';

import { createAndCashSourceMapAtom, createAndCashSourceMapModule } from '../src/utils/change/createAndCashSourceMap';

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
  .action(() => arcStart({ settingsFolder: options.config }));

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

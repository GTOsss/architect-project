import { smartRequire } from '../smartRequire';

import configPath from '../../configPath';

const stringifyObject = require('stringify-object');
const chalk = require('chalk');
const fs = require('file-system');
const { resolve } = require('path');
const eslintConfig = smartRequire(configPath.eslintConfigPath, {});

const startEsLint = require('../../functions/starters/startESLint');
const appendVersion = require('./appendVersion');

const sourceMapAtom = smartRequire(configPath.sourceMapAtom, {});
const sourceMapModule = smartRequire(configPath.sourceMapModule, {});

const { sourceMapToModule } = require('./atomToModuleSourceMap');
const { sourceMapToAtom } = require('./moduleToAtomSourceMap');

const atomToModuleParams = {
  prefix: 'atm_',
  fileName: 'source-map-module.js',
  oldPath: resolve(configPath.sourceMapModule),
  currentSourceMap: sourceMapAtom,
  currentFileName: 'source-map-atom.js',
  method: sourceMapToModule,
  prettyMap: {
    indent: '  ',
    singleQuotes: false,
    inlineCharacterLimit: 12,
  },
};

const moduleToAtomParams = {
  prefix: 'mta_',
  fileName: 'source-map-atom.js',
  oldPath: resolve(configPath.sourceMapAtom),
  currentSourceMap: sourceMapModule,
  currentFileName: 'source-map-module.js',
  method: sourceMapToAtom,
  prettyMap: {
    indent: '  ',
    transform: (map, prop, originalResult) => {
      return originalResult.replace(/\n/g, '');
    },
    singleQuotes: false,
    inlineCharacterLimit: 12,
  },
};

const date = new Date();

const createAndCashSourceMap = (params) => {
  const prettyDate = `${params.prefix}${date.toISOString().replace(/:/gi, '-').replace('T', '.')}`;

  const newPath = resolve(configPath.arcHistoryPath, prettyDate, params.fileName);

  try {
    fs.copyFileSync(params.oldPath, newPath);
    console.log(
      chalk.yellow(`Save old ${params.fileName} to .arc/history/source-map/${params.prefix}YYYY-MM-DD.HH-MM-SS...`),
    );
  } catch (err) {
    console.log(err);
  }

  // converting sourceMapToModule

  if (!params.currentSourceMap) {
    console.log(`${params.currentFileName} is not exist`);
    return;
  }

  const { map, aliases } = params.method(params.currentSourceMap);

  const prettyMap = stringifyObject(map, params.prettyMap);

  const prettyAliases = stringifyObject(aliases, {
    indent: '  ',
    singleQuotes: false,
  });

  const content = `const aliases = ${prettyAliases}; \n\n const map = ${prettyMap}; \n\n module.exports = {
  aliases,
  map,
};`;

  const exportPath = resolve(configPath.sourceMap, params.fileName);

  try {
    fs.writeFileSync(exportPath, content);
  } catch (err) {
    console.log(err);
  }

  appendVersion(prettyDate);

  //start EsLint

  startEsLint({ eslintConfig, outputPath: configPath.esLintSourceMapPath }).catch((error) => {
    process.exitCode = 1;
    console.error(error);
  });
};

const createAndCashSourceMapModule = () => createAndCashSourceMap(atomToModuleParams);
const createAndCashSourceMapAtom = () => createAndCashSourceMap(moduleToAtomParams);

module.exports = {
  createAndCashSourceMapModule,
  createAndCashSourceMapAtom,
};

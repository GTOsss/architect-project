import { smartRequire } from '../smartRequire';
import configPath from '../../configPath';
import stringifyObject from 'stringify-object';
import chalk from 'chalk';
import fs from 'file-system';
import { resolve } from 'path';
// import { startEsLint } from '../../functions/starters/startESLint';
import { appendVersion } from './appendVersion';
import { moduleToAtomSourceMap } from './moduleToAtomSourceMap';
import { atomToModuleSourceMap } from './atomToModuleSourceMap';

const sourceMapAtom = smartRequire(configPath.sourceMapAtom, {});
const sourceMapModule = smartRequire(configPath.sourceMapModule, {});

const atomToModuleParams = {
  prefix: 'atm_',
  fileName: 'source-map-module.js',
  oldPath: resolve(configPath.sourceMapModule),
  currentSourceMap: sourceMapAtom,
  currentFileName: 'source-map-atom.js',
  method: atomToModuleSourceMap,
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
  method: moduleToAtomSourceMap,
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

  // startEsLint({ eslintConfig, outputPath: configPath.esLintSourceMapPath }).catch((error) => {
  //   process.exitCode = 1;
  //   console.error(error);
  // });
};

export const createAndCashSourceMapModule = () => createAndCashSourceMap(atomToModuleParams);
export const createAndCashSourceMapAtom = () => createAndCashSourceMap(moduleToAtomParams);

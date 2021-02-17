const { resolve } = require('path');
const fs = require('file-system');
const { getObjectWithPaths, parseFiles, createFilesBySourceMap, startEsLint } = require('./functions');
const eslintConfig = require('../.eslintrc.js');

const sourcesMapTxtPath = resolve(__dirname, '../settings/source-map.txt');
const sourcesMapJsPath = resolve(__dirname, '../settings/source-map.js');
const outputPath = resolve(__dirname, '../output/**/*[.tsx, .ts, .js, .jsx,]');

// switcher
const ifExistSourceMapPath = fs.existsSync(sourcesMapTxtPath);
const sourcesMap = ifExistSourceMapPath ? require('./functions/parseSourceMap') : require(sourcesMapJsPath);

//arc
const templatesPath = resolve(__dirname, '../settings/templates');

const arc = () => {
  const templates = getObjectWithPaths(templatesPath);
  const templateMap = parseFiles(templates);

  createFilesBySourceMap(templateMap, sourcesMap);

  //start EsLint
  startEsLint({ eslintConfig, outputPath }).catch((error) => {
    process.exitCode = 1;
    console.error(error);
  });
};

module.exports = arc;

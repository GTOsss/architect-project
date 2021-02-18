const appRoot = process.cwd();
const fs = require('file-system');
const { getObjectWithPaths, parseFiles, createFilesBySourceMap, startEsLint } = require('./functions');
const config = require(`${appRoot}/settings/config.js`);
const eslintConfig = require(config.eslintConfigPath);

// switcher
const ifExistSourceMapPath = fs.existsSync(config.sourcesMapTxtPath);
const sourcesMap = ifExistSourceMapPath ? require('./functions/parseSourceMap') : require(config.sourcesMapJsPath);

//arc

const arc = () => {
  const templates = getObjectWithPaths(config.templatesPath);
  const templateMap = parseFiles(templates);

  createFilesBySourceMap(templateMap, sourcesMap);

  //start EsLint
  startEsLint({ eslintConfig, outputPath: config.esLintOutputPath }).catch((error) => {
    process.exitCode = 1;
    console.error(error);
  });
};
arc();
module.exports = arc;

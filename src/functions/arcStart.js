const fs = require('file-system');
const chalk = require('chalk');
const getObjectWithPaths = require('./getObjectWithPaths');
const parseFiles = require('./parseFiles');
const createFilesBySourceMap = require('./createFileBySourceMap');

const configPath = require('../configPath');

// switcher
const ifExistSourceMapPath = fs.existsSync(configPath.sourcesMapTxtPath);
const sourcesMap = ifExistSourceMapPath ? require('./functions/parseSourceMap') : require(configPath.sourcesMapJsPath);

const arcStart = (str) => {
  console.log(chalk.yellow(str));

  const templates = getObjectWithPaths(configPath.templatesPath);
  const templateMap = parseFiles(templates);

  createFilesBySourceMap(templateMap, sourcesMap);
};

module.exports = arcStart;

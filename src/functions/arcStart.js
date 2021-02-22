const chalk = require('chalk');
const getObjectWithPaths = require('./getObjectWithPaths');
const parseFiles = require('./parseFiles');
const createFilesBySourceMap = require('./createFileBySourceMap');
const configPath = require('../configPath');
const startEsLint = require('./startESLint');

const arcStart = ({ str, sourcesMap }) => {
  console.log(chalk.yellow(str));

  const templates = getObjectWithPaths(configPath.templatesPath);
  const templateMap = parseFiles(templates);

  createFilesBySourceMap(templateMap, sourcesMap);
};

const arcStartWithEslint = ({ str, sourcesMap }) => {
  console.log(chalk.yellow(str));

  const templates = getObjectWithPaths(configPath.templatesPath);
  const templateMap = parseFiles(templates);

  createFilesBySourceMap(templateMap, sourcesMap);

  const eslintConfig = require(configPath.eslintConfigPath);

  //start EsLint
  startEsLint({ eslintConfig, outputPath: configPath.esLintOutputPath }).catch((error) => {
    process.exitCode = 1;
    console.error(error);
  });
};

module.exports = { arcStart, arcStartWithEslint };

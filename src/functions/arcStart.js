const getObjectWithPaths = require('./getObjectWithPaths');
const parseFiles = require('./parseFiles');
const { createFilesBySourceMap } = require('./createFileBySourceMap');
const config = require('../configPath');

const startEsLint = require('./startESLint');

const getTemplateMap = () => {
  const templates = getObjectWithPaths(config.templatesPath);
  return parseFiles(templates);
};

const getEsLintOutputPath = () => {
  return config.esLintOutputPath;
};

const arcStart = ({ sourcesMap }) => {
  createFilesBySourceMap(getTemplateMap(), sourcesMap);
};

const arcStartWithEslint = ({ sourcesMap }) => {
  createFilesBySourceMap(getTemplateMap(), sourcesMap);

  //start EsLint
  const eslintConfig = require(config.eslintConfigPath);

  startEsLint({ eslintConfig, outputPath: getEsLintOutputPath() }).catch((error) => {
    process.exitCode = 1;
    console.error(error);
  });
};

module.exports = { arcStart, arcStartWithEslint };

const getObjectWithPaths = require('../getters/getObjectWithPaths');
const parseFiles = require('../parsers/parseFiles');
const { createFilesBySourceMap } = require('../generators/createFileBySourceMap');
const { withEslint } = require('../../store/esLint');
const config = require('../../configPath');

const getTemplateMap = () => {
  const templates = getObjectWithPaths(config.templatesPath);
  return parseFiles(templates);
};

const arcStart = ({ sourcesMap }) => {
  createFilesBySourceMap(getTemplateMap(), sourcesMap);
};

const arcStartWithEslint = ({ sourcesMap }) => {
  createFilesBySourceMap(getTemplateMap(), sourcesMap);
  withEslint();
};

module.exports = { arcStart, arcStartWithEslint };

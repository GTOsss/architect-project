const getObjectWithPaths = require('./getters/getObjectWithPaths');
const getScriptPath = require('./getters/getScriptPath');
const { generateTemplateFiles } = require('./generators/generateTemplateFiles');
const parseFiles = require('./parsers/parseFiles');
const requireFunction = require('./requireFunction');
const generateFilePath = require('./generators/generateFilePath');
const { createFilesBySourceMap } = require('./generators/createFileBySourceMap');
const getSectionFromSourceMap = require('./getters/getSectionFromSourceMap');
const writeFile = require('../utils/writeFile');
const startEsLint = require('./starters/startESLint');
const { arcStart, arcStartWithEslint } = require('./starters/arcStart');
const { startWatcher, startWatcherWithEslint } = require('./starters/startWatcher');
const watchTemplateSettings = require('./watchTemplateSettings');

module.exports = {
  getObjectWithPaths,
  getScriptPath,
  generateTemplateFiles,
  parseFiles,
  requireFunction,
  generateFilePath,
  createFilesBySourceMap,
  getSectionFromSourceMap,
  writeFile,
  startEsLint,
  arcStart,
  arcStartWithEslint,
  startWatcherWithEslint,
  startWatcher,
  watchTemplateSettings,
};

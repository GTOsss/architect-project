const getFilesPath = require('./getFilesPath');
const getObjectWithPaths = require('./getObjectWithPaths');
const getScriptPath = require('./getScriptPath');
const parseFiles = require('./parseFiles');
const requireFunction = require('./requireFunction');
const generateFilePath = require('./generateFilePath');
const createFilesBySourceMap = require('./createFileBySourceMap');
const getSectionFromSourceMap = require('./getSectionFromSourceMap');
const writeFile = require('./writeFile');
const startEsLint = require('./startESLint');
const arcStart = require('./arcStart');
const startWatcher = require('./startWatcher');
const { changeOutput, changeOutputWithEslint } = require('./changeSourceMapHandler');

module.exports = {
  getFilesPath,
  getObjectWithPaths,
  getScriptPath,
  parseFiles,
  requireFunction,
  generateFilePath,
  createFilesBySourceMap,
  getSectionFromSourceMap,
  writeFile,
  startEsLint,
  arcStart,
  changeOutput,
  changeOutputWithEslint,
  startWatcher,
};

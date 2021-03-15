const appRoot = process.cwd();

const eslintConfigPath = `${appRoot}/.eslintrc.js`;
const sourceMap = `${appRoot}/architect/source_map`;
const sourcesMapModuleTxtPath = `${appRoot}/architect/source_map/source-map-module.txt`;
const sourcesMapModuleJsPath = `${appRoot}/architect/source_map/source-map-module.js`;
const sourcesMapAtomJsPath = `${appRoot}/architect/source_map/source-map-atom.js`;
const architect = `${appRoot}/architect`;
const templatesPath = `${appRoot}/architect/templates`;
const parseSourceMapPath = `${appRoot}/src/functions/parseSourceMap`;
const assetsPath = `${appRoot}/architect/assets`;
const methodsPath = `${appRoot}/architect/methods`;
const config = `${appRoot}/architect/config.js`;
const { output } = require(config);
const outputPath = `${appRoot}/${output}`;
const esLintOutputPath = `${appRoot}/${output}/**/*[.tsx, .ts, .js, .jsx,]`;
const esLintSourceMapPath = `${appRoot}/architect/source_map/*[.js,]`;
const arcHistoryPath = `${appRoot}/architect/.arc/history/source-map`;
const arcBackupsPath = `${appRoot}/architect/.arc/backups`;
const backupsVersionsJsonPath = `${appRoot}/architect/.arc/backups/versions.json`;
const versionsJsonPath = `${appRoot}/architect/.arc/history/source-map/versions.json`;

module.exports = {
  eslintConfigPath,
  sourcesMapModuleTxtPath,
  sourcesMapModuleJsPath,
  sourcesMapAtomJsPath,
  esLintOutputPath,
  templatesPath,
  parseSourceMapPath,
  outputPath,
  assetsPath,
  methodsPath,
  config,
  architect,
  esLintSourceMapPath,
  arcHistoryPath,
  sourceMap,
  versionsJsonPath,
  arcBackupsPath,
  backupsVersionsJsonPath,
};

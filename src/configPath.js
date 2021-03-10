const appRoot = process.cwd();

const eslintConfigPath = `${appRoot}/.eslintrc.js`;
const sourcesMapModuleTxtPath = `${appRoot}/settings/source-map-module.txt`;
const sourcesMapModuleJsPath = `${appRoot}/settings/source-map-module.js`;
const sourcesMapAtomJsPath = `${appRoot}/settings/source-map-atom.js`;
const settings = `${appRoot}/settings`;
const templatesPath = `${appRoot}/settings/templates`;
const parseSourceMapPath = `${appRoot}/src/functions/parseSourceMap`;
const assetsPath = `${appRoot}/settings/assets`;
const methodsPath = `${appRoot}/settings/methods`;
const config = `${appRoot}/settings/config.js`;
const { output } = require(config);
const outputPath = `${appRoot}/${output}`;
const esLintOutputPath = `${appRoot}/${output}/**/*[.tsx, .ts, .js, .jsx,]`;

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
  settings,
};

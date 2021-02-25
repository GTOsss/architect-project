const appRoot = process.cwd();

const eslintConfigPath = `${appRoot}/.eslintrc.js`;
const sourcesMapTxtPath = `${appRoot}/settings/source-map.txt`;
const sourcesMapJsPath = `${appRoot}/settings/source-map.js`;
const outputPath = `${appRoot}/output`;
const settings = `${appRoot}/settings`;
const esLintOutputPath = `${appRoot}/output/**/*[.tsx, .ts, .js, .jsx,]`;
const templatesPath = `${appRoot}/settings/templates`;
const parseSourceMapPath = `${appRoot}/src/functions/parseSourceMap`;
const assetsPath = `${appRoot}/settings/assets`;
const methodsPath = `${appRoot}/settings/methods`;
const config = `${appRoot}/settings/config.js`;

module.exports = {
  eslintConfigPath,
  sourcesMapTxtPath,
  sourcesMapJsPath,
  esLintOutputPath,
  templatesPath,
  parseSourceMapPath,
  outputPath,
  assetsPath,
  methodsPath,
  config,
  settings,
};

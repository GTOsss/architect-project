const arcStart = require('./arcStart');
const configPath = require('../configPath');
const eslintConfig = require(configPath.eslintConfigPath);

const changeOutput = () => {
  arcStart('Starting architect...');
  console.log('Project has been rebuild');
};

const changeOutputWithEslint = () => {
  arcStart('Starting architect with EsLint...');

  //start EsLint
  startEsLint({ eslintConfig, outputPath: configPath.esLintOutputPath }).catch((error) => {
    process.exitCode = 1;
    console.error(error);
  });

  console.log('Project has been rebuild with Eslint');
};

module.exports = { changeOutput, changeOutputWithEslint };

const { startEsLint, arcStart } = require('./functions');
const configPath = require('./configPath');

//arc
const arc = () => {
  arcStart('Starting architect...');
};

const arcWithEslint = () => {
  const eslintConfig = require(configPath.eslintConfigPath);

  arcStart('Starting architect with EsLint...');

  //start EsLint
  startEsLint({ eslintConfig, outputPath: configPath.esLintOutputPath }).catch((error) => {
    process.exitCode = 1;
    console.error(error);
  });
};

module.exports = { arcWithEslint, arc };

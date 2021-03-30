const configPath = require('../configPath');

const generateFilePath = ({ filePath, outputPath, inputPath, templateParams, backupPath }) => {
  const config = require(configPath.config);
  const reGetFileName = new RegExp(`(?<=\\${config.itrFileNameStart})(.+?)(?=\\${config.itrFileNameEnd})`, 'gi');

  const matchedBracketsPath = filePath.match(reGetFileName);

  let pathWithSourceMapVariable = filePath;

  if (matchedBracketsPath) {
    matchedBracketsPath.forEach((el) => {
      const reComponentName = new RegExp(`\\${config.itrFileNameStart}${el}\\${config.itrFileNameEnd}`, 'gi');

      pathWithSourceMapVariable = pathWithSourceMapVariable.replace(reComponentName, templateParams.value[el]);
    });
  }

  return {
    filePath: pathWithSourceMapVariable.replace(inputPath, outputPath).replace(config.templateExt, ''),
    backupFilePath: pathWithSourceMapVariable.replace(inputPath, backupPath).replace(config.templateExt, ''),
  };
};

module.exports = generateFilePath;

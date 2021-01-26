const config = require('../../settings/config');

const reGetFileName = new RegExp(`${config.itrFileNameStart}[a-z]+${config.itrFileNameEnd}`, 'gi');

const generateFilePath = ({ filePath, componentName, outputPath, inputPath }) => {
  return filePath.replace(inputPath, outputPath).replace(reGetFileName, componentName).replace(config.templateExt, '');
};

module.exports = generateFilePath;

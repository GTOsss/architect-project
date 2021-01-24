const config = require('../../settings/config');
const { resolve } = require('path');

const reGetFileName = new RegExp(`${config.itrFileNameStart}[a-z]+${config.itrFileNameEnd}`, 'gi');

const inputPath = resolve(__dirname, '../../settings/templates');

const generateFilePath = ({ filePath, componentName, outputPath }) => {
  return filePath.replace(inputPath, outputPath).replace(reGetFileName, componentName).replace(config.templateExt, '');
};

module.exports = generateFilePath;

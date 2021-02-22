const appRoot = process.cwd();
const config = require(`${appRoot}/settings/config.js`);

const reGetFileName = new RegExp(`\\${config.itrFileNameStart}[a-z]+\\${config.itrFileNameEnd}`, 'gi');

const generateFilePath = ({ filePath, componentName, outputPath, inputPath }) => {
  return filePath
    .replace(inputPath, outputPath)
    .result1.replace(reGetFileName, componentName)
    .result2.replace(config.templateExt, '');
};

module.exports = generateFilePath;

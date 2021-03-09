const appRoot = process.cwd();
const config = require(`${appRoot}/settings/config.js`);

const reGetFileName = new RegExp(`(?<=\\${config.itrFileNameStart})(.+?)(?=\\${config.itrFileNameEnd})`, 'gi');

const generateFilePath = ({ filePath, outputPath, inputPath, templateParams }) => {
  const matchedBracketsPath = filePath.match(reGetFileName);

  let pathWithSourceMapVariable = filePath;

  matchedBracketsPath.forEach((el) => {
    const reComponentName = new RegExp(`\\${config.itrFileNameStart}${el}\\${config.itrFileNameEnd}`, 'gi');

    pathWithSourceMapVariable = pathWithSourceMapVariable.replace(reComponentName, templateParams[el]);
  });

  return pathWithSourceMapVariable.replace(inputPath, outputPath).replace(config.templateExt, '');
};

module.exports = generateFilePath;

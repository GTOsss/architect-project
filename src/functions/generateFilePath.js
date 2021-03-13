const appRoot = process.cwd();
const config = require(`${appRoot}/architect/config.js`);

const reGetFileName = new RegExp(`(?<=\\${config.itrFileNameStart})(.+?)(?=\\${config.itrFileNameEnd})`, 'gi');

const generateFilePath = ({ filePath, outputPath, inputPath, templateParams, backupPath }) => {
  const matchedBracketsPath = filePath.match(reGetFileName);

  let pathWithSourceMapVariable = filePath;

  matchedBracketsPath.forEach((el) => {
    const reComponentName = new RegExp(`\\${config.itrFileNameStart}${el}\\${config.itrFileNameEnd}`, 'gi');

    pathWithSourceMapVariable = pathWithSourceMapVariable.replace(reComponentName, templateParams[el]);
  });

  return {
    filePath: pathWithSourceMapVariable.replace(inputPath, outputPath).replace(config.templateExt, ''),
    backupFilePath: pathWithSourceMapVariable.replace(inputPath, backupPath).replace(config.templateExt, ''),
  };
};

module.exports = generateFilePath;

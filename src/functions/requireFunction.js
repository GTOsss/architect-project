const _ = require('lodash');
const chalk = require('chalk');
const { resolve } = require('path');
const { getWriteFile, getWriteFileStream } = require('../utils/writeFile');
const configPath = require('../configPath');

const requireFunction = ({
  functionName,
  variableValue,
  templateScript,
  template,
  sectionFromSourceMap,
  assets,
  resultFileName,
}) => {
  const methods = require(configPath.methodsPath);

  try {
    const currentMethod = _.get(templateScript, functionName) || _.get(methods, functionName);

    const writeFilePath = resolve(__dirname, '../..', configPath.outputPath, sectionFromSourceMap.path, resultFileName);

    const writeFile = getWriteFile(writeFilePath);
    const writeFileStream = getWriteFileStream(writeFilePath);

    return currentMethod(variableValue, { sectionFromSourceMap, writeFile, writeFileStream, assets });
  } catch (e) {
    if (functionName !== 'main') {
      const err = chalk.red(`Not found function ${functionName} in template ${template}`);
      console.log(err, e.stack);
    }
  }
};

module.exports = requireFunction;

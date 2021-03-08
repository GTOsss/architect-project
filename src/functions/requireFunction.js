const _ = require('lodash');
const { resolve } = require('path');
const getWriteFile = require('./writeFile');
const configPath = require('../configPath');
const methods = require(configPath.methodsPath);

const requireFunction = ({
  functionName,
  variableValue,
  templateScript,
  template,
  sectionFromSourceMap,
  assets,
  resultFileName,
}) => {
  try {
    const currentMethod = _.get(templateScript, functionName) || _.get(methods, functionName);
    const writeFilePath = resolve(__dirname, '../..', configPath.outputPath, sectionFromSourceMap.path, resultFileName);
    const writeFile = getWriteFile(writeFilePath);
    return currentMethod(variableValue, { sectionFromSourceMap, writeFile, assets });
  } catch (e) {
    if (functionName !== 'main') {
      const err = `Not found function ${functionName} in template ${template}`;
      console.log(err);
    }
  }
};

module.exports = requireFunction;

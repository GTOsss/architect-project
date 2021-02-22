const _ = require('lodash');
const { resolve } = require('path');
const getWriteFile = require('./writeFile');
const configPath = require('../configPath');
const methods = require(configPath.methodsPath);

const requireFunction = ({ functionName, variableName, templateScript, template, sectionFromSourceMap, assets }) => {
  try {
    const currentMethod = _.get(templateScript, functionName) || _.get(methods, functionName);
    const writeFilePath = resolve(__dirname, '../..', configPath.outputPath, sectionFromSourceMap.path, variableName);
    const writeFile = getWriteFile(writeFilePath);
    return currentMethod(variableName, { sectionFromSourceMap, writeFile, assets });
  } catch (e) {
    if (functionName !== 'main') {
      const err = `Not found function ${functionName} in template ${template}`;
      console.log(err);
    }
  }
};

module.exports = requireFunction;

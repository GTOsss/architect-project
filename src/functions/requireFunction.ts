import { resolve } from 'path';
import configPath from '../configPath';
import { getWriteFile, getWriteFileStream } from '../utils/writeFile';
import _ from 'lodash';
import chalk from 'chalk';

export const requireFunction = ({
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

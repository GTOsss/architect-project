import { resolve } from 'path';
import configPath from '../configPath';
import { getWriteFile, getWriteFileStream } from '../utils/writeFile';
import _ from 'lodash';
import chalk from 'chalk';

export type HelpAPI = {
  /**
   * Write file by current target path */
  writeFile: ReturnType<typeof getWriteFile>;
  writeFileStream: ReturnType<typeof getWriteFileStream>;
  // todo Expand type
  sectionFromSourceMap: any;
  // todo Expand type
  assets: any;
};

/**
 *
 * Import and call custom template function from:
 *  "templateName/_script_.js"
 *        or
 *  "architect/methods.js"
 *
 * */
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

    // TODO Add documentation about second obj argument (writeFile, assets and other)
    return currentMethod(variableValue, { sectionFromSourceMap, writeFile, writeFileStream, assets });
  } catch (e) {
    if (functionName !== 'main') {
      const msg = `Problem with function "${functionName}" in template "${template}"`;
      const err = chalk.red(msg);
      console.log(err, '\n', e.stack);
      // If was error: put error message and error stack in result file.
      return ['\n', '{{', '\n', msg, '\n---\n', e.stack, '\n', '}}', '\n'].join('');
    }
  }
};

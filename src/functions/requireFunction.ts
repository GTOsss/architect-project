import { resolve } from 'path';
import configPath from '../configPath';
import { getWriteFile, getWriteFileStream } from '../utils/writeFile';
import _ from 'lodash';
import chalk from 'chalk';
import { RequiredTemplateScript } from './getters';
import { SourceMapModuleConsistent, TemplateParamsConsistent } from '../types/sourceMapModuleConsistent';

export type HelpAPI = {
  /** Write file by current target path */
  writeFile: ReturnType<typeof getWriteFile>;
  writeFileStream: ReturnType<typeof getWriteFileStream>;
  sourceMap: SourceMapModuleConsistent;
  templateParams: TemplateParamsConsistent;
  // todo Expand type
  assets: any;
};

type RequireFunctionParams = {
  functionName: string;
  functionArg: string;
  templateScript: RequiredTemplateScript;
  templateParams: TemplateParamsConsistent;
  sourceMap: SourceMapModuleConsistent;
  // todo Expand type
  assets: any;
};

/**
 *
 * Import and call custom template function from:
 *  "templateName/_script_.js" // templateScript get from arguments current function
 *        or
 *  "architect/methods.js" // methods get from architect config directory
 *
 * */
export const requireFunction = ({
  functionName,
  functionArg,
  templateScript,
  templateParams,
  sourceMap,
  assets,
}: RequireFunctionParams): string => {
  const methods = require(configPath.methodsPath);

  try {
    const currentMethod = _.get(templateScript, functionName) || _.get(methods, functionName);

    const writeFilePath = resolve(__dirname, '../..', configPath.outputPath, templateParams.outputPath);

    const writeFile = getWriteFile(writeFilePath);
    const writeFileStream = getWriteFileStream(writeFilePath);

    // TODO Add documentation about second obj argument (writeFile, assets and other)
    return currentMethod(functionArg, {
      templateParams,
      sourceMap,
      writeFile,
      writeFileStream,
      assets,
    });
  } catch (e) {
    if (functionName !== 'main') {
      const msg = `Problem with function "${functionName}" in template "${templateParams.template}"`;
      const err = chalk.red(msg);
      console.log(err, '\n', e.stack);
      // If was error: put error message and error stack in result file.
      return ['\n', '{{', '\n', msg, '\n---\n', e.stack, '\n', '}}', '\n'].join('');
    }
  }
};

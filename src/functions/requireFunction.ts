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

/** Params for baseMode */
type RequireFunctionBaseParams = Pick<RequireFunctionParams, 'functionName' | 'functionArg'>;

/***
 * @param params
 * @param baseMode If true, methods from interpolation fragments
 * will be call with only one fn argument (without HelpAPI). Default false.
 *
 * Import and call custom template function from:
 *  "templateName/_script_.js" // templateScript get from arguments current function
 *        or
 *  "architect/methods.js" // methods get from architect config directory
 * */
export const requireFunction = <BaseMode extends boolean>(
  params: BaseMode extends true ? RequireFunctionBaseParams : RequireFunctionParams,
  baseMode?: BaseMode,
): string => {
  const isBaseMode = baseMode;
  const isFullMode = !baseMode;

  const { functionName, functionArg } = params;
  const methods = require(configPath.methodsPath);

  const paramsForFullMode = params as RequireFunctionParams;

  try {
    if (isBaseMode) {
      // ↓ in this if-block use for simplify template generator logic ↓

      const methodFromArcConfig = _.get(methods, functionName);
      return methodFromArcConfig(functionArg);

      // ↑ in this if-block use for simplify template generator logic ↑
    } else if (isFullMode) {
      // ↓ in this if-block use for full template generator logic ↓

      const { templateParams, functionArg, ...rest } = paramsForFullMode;
      const currentMethod = _.get(paramsForFullMode.templateScript, functionName) || _.get(methods, functionName);

      const writeFilePath = resolve(__dirname, '../..', configPath.outputPath, templateParams.outputPath);

      const writeFile = getWriteFile(writeFilePath);
      const writeFileStream = getWriteFileStream(writeFilePath);

      // TODO Add documentation about second obj argument (writeFile, assets and other)
      return currentMethod(functionArg, {
        templateParams,
        writeFile,
        writeFileStream,
        ...rest,
      });
      // ↑ in this if-block use for full template generator logic ↑
    }
  } catch (e) {
    const isNotTryCallMain = functionName !== 'main';
    if (isNotTryCallMain) {
      let msg = '';
      if (isBaseMode) {
        msg = `Problem with function "${functionName}"`;
      } else if (isFullMode) {
        msg = `Problem with function "${functionName}" in template "${paramsForFullMode.templateParams.template}"`;
      }

      const err = chalk.red(msg);
      console.log(err, '\n', e.stack);
      // If was error: put error message and error stack in result file.
      return ['\n', '{{', '\n', msg, '\n---\n', e.stack, '\n', '}}', '\n'].join('');
    }
  }
};

import { ParsedFragmentDataTypeEnum, ParsedTemplateFile } from '../../parsers/parseTemplateFiles';
import { SourceMapModuleConsistent, TemplateParamsConsistent } from '../../../types/sourceMapModuleConsistent';
import { RequiredTemplateScript } from '../../getters';
import { requireFunction } from '../../requireFunction';

type ParsedTemplate = Pick<ParsedTemplateFile, 'parsed' | 'content'>;

export type GenerateContentByParsedTemplateParams = {
  templateParams: TemplateParamsConsistent;
  templateScript: RequiredTemplateScript;
  sourceMap: SourceMapModuleConsistent;
  assets: any;
};

/** Params for baseMode */
export type GenerateContentByParsedTemplateBaseParams = {
  /** Keys from template interpolation fragments with any values */
  [key: string]: any;
};

/**
 * @param parsed
 * @param originContent
 * @param templateParams
 * @param params
 * @param baseMode If true, methods from interpolation fragments will be call with
 * only one fn argument (without HelpAPI). Default false.
 *
 * Generate content by ParsedTemplateFile, TemplateParams and other detected data
 * */
export const generateContentByParsedTemplate = <BaseMode extends boolean>(
  { parsed, content: originContent }: ParsedTemplate,
  // if active baseMode, all params it Record<string, any> that passed from arguments
  // else params get from sourceMap and other sources
  params: BaseMode extends true ? GenerateContentByParsedTemplateBaseParams : GenerateContentByParsedTemplateParams,
  baseMode?: BaseMode,
) => {
  const isBaseMode = baseMode;
  const isFullMode = !baseMode;

  const paramsForFullMode = params as GenerateContentByParsedTemplateParams;

  let resultContent = originContent;
  parsed.forEach(({ originStr, data }) => {
    let currentFragmentResult = '';

    if (data.type === ParsedFragmentDataTypeEnum.variable) {
      if (isFullMode) {
        currentFragmentResult = paramsForFullMode.templateParams[data.variableName];
      } else if (isBaseMode) {
        currentFragmentResult = params[data.variableName];
      }
    } else if (data.type === ParsedFragmentDataTypeEnum.callFunction) {
      const { functionName, functionArgs } = data;
      const firstParsedArg = functionArgs[0];

      if (isFullMode) {
        const { templateParams, ...rest } = paramsForFullMode;
        // if there is no in "templateParams", then the expression from arg is literal
        const functionArg = templateParams[firstParsedArg] || firstParsedArg;
        currentFragmentResult = requireFunction({ functionName, functionArg, templateParams, ...rest }, false);
      } else if (isBaseMode) {
        // if there is no in "templateParams", then the expression from arg is literal
        const functionArg = params[firstParsedArg] || firstParsedArg;
        currentFragmentResult = requireFunction({ functionName, functionArg }, true);
      }
    }

    resultContent = resultContent.replace(originStr, currentFragmentResult);
  });

  return resultContent;
};

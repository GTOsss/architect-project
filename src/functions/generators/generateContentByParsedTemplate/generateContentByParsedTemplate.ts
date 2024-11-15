import { ParsedFragmentDataTypeEnum, ParsedTemplateFile } from '../../parsers/parseTemplateFiles';
import { SourceMapModuleConsistent, TemplateParamsConsistent } from '../../../types/sourceMapModuleConsistent';
import { RequiredTemplateScript } from '../../getters';
import { requireFunction } from '../../requireFunction';

type GenerateContentByParsedTemplateParams = {
  templateParams: TemplateParamsConsistent;
  templateScript: RequiredTemplateScript;
  sourceMap: SourceMapModuleConsistent;
  assets: any;
};

/**
 * Generate content by ParsedTemplateFile, TemplateParams and other detected data
 * */
export const generateContentByParsedTemplate = (
  { parsed, content: originContent }: ParsedTemplateFile,
  { templateParams, ...rest }: GenerateContentByParsedTemplateParams,
) => {
  let resultContent = originContent;
  parsed.forEach(({ originStr, data }) => {
    let currentFragmentResult = '';

    if (data.type === ParsedFragmentDataTypeEnum.variable) {
      currentFragmentResult = templateParams[data.variableName];
    } else if (data.type === ParsedFragmentDataTypeEnum.callFunction) {
      const { functionName, functionArgs } = data;

      // if there is no in "templateParams", then the expression from arg is literal
      const functionArg = templateParams[functionArgs[0]] || functionArgs[0];
      currentFragmentResult = requireFunction({ functionName, functionArg, templateParams, ...rest });
    }

    resultContent = resultContent.replace(originStr, currentFragmentResult);
  });

  return resultContent;
};

import { TemplateParamsConsistent } from '../../../types/sourceMapModuleConsistent';
import { TemplateConfig } from '../../../types/config';
import { parseAllInterpolationMarks } from '../../parsers';
import { ParsedFragmentDataTypeEnum, ParserContextEnum } from '../../parsers/parseTemplateFiles';

const createInterpolationRegExpPath = ({ itrFileNameStart, itrFileNameEnd }: TemplateConfig) =>
  new RegExp(`(?<=\\${itrFileNameStart})(.+?)(?=\\${itrFileNameEnd})`, 'gm');

type GenerateFilePathParams = {
  config: TemplateConfig;
  filePath: string;
  outputPath: string;
  templatePath: string;
  templateParams: TemplateParamsConsistent;
  backupPath: string;
};

export const generateFilePath = ({
  config,
  filePath,
  outputPath,
  templatePath,
  templateParams,
  backupPath,
}: GenerateFilePathParams) => {
  const reGetFileName = createInterpolationRegExpPath(config);

  const parsedTemplateFragments = parseAllInterpolationMarks(
    filePath,
    reGetFileName,
    config,
    ParserContextEnum.filePath,
  );

  let pathWithSourceMapVariable = filePath;
  parsedTemplateFragments.forEach(({ originStr, data }) => {
    if (data.type === ParsedFragmentDataTypeEnum.variable) {
      pathWithSourceMapVariable = pathWithSourceMapVariable.replace(originStr, templateParams[data.variableName]);
    }
  });

  return {
    filePath: pathWithSourceMapVariable.replace(templatePath, outputPath).replace(config.templateExt, ''),
    backupFilePath: pathWithSourceMapVariable.replace(templatePath, backupPath).replace(config.templateExt, ''),
  };
};

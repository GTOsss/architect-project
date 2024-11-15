import { TemplateParamsConsistent } from '../../../types/sourceMapModuleConsistent';
import { ArcConfig } from '../../../types/config';
import { parseAllInterpolationMarks } from '../../parsers';
import { ParsedFragmentDataTypeEnum, ParserContextEnum } from '../../parsers/parseTemplateFiles';

const createInterpolationRegExpPath = ({ itrFileNameStart, itrFileNameEnd }: ArcConfig) =>
  new RegExp(`(?<=\\${itrFileNameStart})(.+?)(?=\\${itrFileNameEnd})`, 'gm');

type GenerateFilePathParams = {
  config: ArcConfig;
  filePath: string;
  outputPath: string;
  inputPath: string;
  templateParams: TemplateParamsConsistent;
  backupPath: string;
};

export const generateFilePath = ({
  config,
  filePath,
  outputPath,
  inputPath,
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
    filePath: pathWithSourceMapVariable.replace(inputPath, outputPath).replace(config.templateExt, ''),
    backupFilePath: pathWithSourceMapVariable.replace(inputPath, backupPath).replace(config.templateExt, ''),
  };
};

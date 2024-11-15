import { resolve } from 'path';
import fs from 'file-system';
import { generateFilePath } from './generateFilePath/generateFilePath';
import configPath from '../../configPath';
// import { backupFile } from '../../utils/backup/backupFile';
import { pushFiles, pushReplacedFiles } from '../../store';
import { promisifyWriteFile } from '../../utils/promisifyWriteFile';
import { SourceMapModuleConsistent, TemplateParamsConsistent } from '../../types/sourceMapModuleConsistent';
import { ParsedTemplateMap } from '../parsers/parseTemplateFiles';
import { ArcConfig, TemplateConfig } from '../../types/config';
import { generateContentByParsedTemplate } from './generateContentByParsedTemplate/generateContentByParsedTemplate';

type GenerateTemplateFilesParams = {
  /** Target path for generation from source-map file. */
  targetPath: string;
  parsedTemplateMap: ParsedTemplateMap;
  assets: any;
  templateConfig: Partial<TemplateConfig>;
  config: ArcConfig;
  templateParams: TemplateParamsConsistent;
  sourceMap: SourceMapModuleConsistent;
};

export const generateFilesByTemplate = ({
  targetPath,
  parsedTemplateMap,
  assets,
  templateConfig,
  config,
  templateParams,
  sourceMap,
}: GenerateTemplateFilesParams) => {
  const { parsedFiles, templateScript } = parsedTemplateMap[templateParams.template];

  const outputPath = resolve(configPath.outputPath, targetPath);
  const backupPath = resolve(configPath.arcBackupsPath, targetPath);
  const templatePath = resolve(configPath.templatesPath, templateParams.template || '');

  //flag clean >>>
  const dirToRemove = outputPath;
  if (templateConfig.clean) {
    if (fs.existsSync(dirToRemove)) {
      fs.rmdirSync(dirToRemove, { recursive: true });
    }
  }
  //<<<

  const writeFilePromises = parsedFiles.map(async (parsedTemplateFile) => {
    const { filePath, backupFilePath } = generateFilePath({
      config,
      filePath: parsedTemplateFile.file,
      outputPath,
      inputPath: templatePath,
      templateParams,
      backupPath,
    });

    const content = generateContentByParsedTemplate(parsedTemplateFile, {
      templateParams,
      templateScript,
      sourceMap,
      assets,
    });

    // flag replace >>>
    let result = null;

    if (fs.existsSync(filePath)) {
      if (config.replace) {
        result = promisifyWriteFile(filePath, content, { method: pushReplacedFiles });
      }
    } else {
      result = promisifyWriteFile(filePath, content, { method: pushFiles });
    }
    // <<<

    // todo implement replace flag
    // flag replace >>>
    // if (config.backups) {
    //   backupFile({ filePath, backupFilePath, template, config });
    // }
    // <<<

    return result;
  });

  return Promise.all(writeFilePromises);
};

import { resolve } from 'path';
import fs from 'file-system';
import { generateFilePath } from './generateFilePath';
import configPath from '../../configPath';
import { backupFile } from '../../utils/backup/backupFile';
import { pushFiles, pushReplacedFiles } from '../../store';
import { promisifyWriteFile } from '../../utils/promisifyWriteFile';
import { SourceMapModuleConsistent, TemplateParamsConsistent } from '../../types/sourceMapModuleConsistent';
import { generateContentByParsedTemplate } from './generateContentByParsedTemplate/generateContentByParsedTemplate';
import { getConfigByTemplate } from '../../store/config';
import { $parsedTemplateMap } from '../../store/templates';

export type GenerateTemplateFilesParams = {
  /** Target path for generation from source-map file. */
  targetPath: string;
  assets: any;
  templateParams: TemplateParamsConsistent;
  sourceMap: SourceMapModuleConsistent;
};

export const generateFilesByTemplate = ({
  targetPath,
  assets,
  templateParams,
  sourceMap,
}: GenerateTemplateFilesParams) => {
  const config = getConfigByTemplate(templateParams.template);

  const parsedTemplateMap = $parsedTemplateMap.getState();

  const { parsedFiles, templateScript } = parsedTemplateMap[templateParams.template];

  const outputPath = resolve(configPath.outputPath, targetPath);
  const backupPath = resolve(configPath.arcBackupsPath, targetPath);
  const templatePath = resolve(configPath.templatesPath, templateParams.template || '');

  //flag clean >>>
  const dirToRemove = outputPath;
  if (config.clean) {
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
      templatePath,
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

    // flag backup >>>
    if (config.backup) {
      backupFile({ filePath, backupFilePath, template: templateParams.template, config });
    }
    // <<<

    return result;
  });

  return Promise.all(writeFilePromises);
};

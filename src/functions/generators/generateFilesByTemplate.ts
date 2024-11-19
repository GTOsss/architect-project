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
import { applyEslintAutofix } from '../../utils/applyEslintAutoFix';
import paths from '../../configPath';
import { TemplateConfig } from '../../types/config';
import { AnyMethod } from '../../types/common';

export type WriteAndyApplyEslintParams = { filePath: string; content: string; config: TemplateConfig; cb: AnyMethod };
const writeAndyApplyEslint = async ({ filePath, content, config, cb }: WriteAndyApplyEslintParams) => {
  await promisifyWriteFile(filePath, content, { cb });
  if (config.esLint) {
    const eslintConfigPath = resolve(paths.cwd, config.esLint.configFile);
    await applyEslintAutofix({ code: content, eslintConfigPath, filePath });
  }
};

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

    // flag backup >>>
    if (config.backup) {
      backupFile({ filePath, backupFilePath, template: templateParams.template, config });
    }
    // <<<

    // flag replace >>>

    const isFileExists = fs.existsSync(filePath);
    const isFileDoesNotExist = !isFileExists;
    const isActiveReplace = config.replace;

    if (isFileDoesNotExist) {
      await writeAndyApplyEslint({ filePath, content, config, cb: pushFiles });
    } else if (isFileExists && isActiveReplace) {
      await writeAndyApplyEslint({ filePath, content, config, cb: pushReplacedFiles });
    }

    // <<<
  });

  return Promise.all(writeFilePromises);
};

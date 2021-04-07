const { resolve } = require('path');
const fs = require('file-system');
const requireFunction = require('../requireFunction');
const generateFilePath = require('./generateFilePath');
const configPath = require('../../configPath');
const backupFile = require('../../utils/backup/backupFile');
const parsedFunctionToMap = require('../../utils/parsedFunctionToMap');
const { pushFiles, pushReplacedFiles } = require('../../store/createdFiles');
const { promisifyWriteFile } = require('../../utils/promisifyWriteFile');

const generateTemplateFiles = ({
  sourcePath,
  fileName,
  templateValue,
  template,
  mapCurrentComponent,
  assets,
  templateParams,
  config,
}) => {
  const { parsedFiles, templateScript } = templateValue;

  const outputPath = resolve(configPath.outputPath, sourcePath);

  const backupPath = resolve(configPath.arcBackupsPath, sourcePath);

  const inputPath = resolve(configPath.templatesPath, template || '');

  //flag clean >>>
  const dirToRemove = outputPath;
  if (config.clean) {
    if (fs.existsSync(dirToRemove)) {
      fs.rmdirSync(dirToRemove, { recursive: true });
    }
  }
  //<<<

  const writeFilePromises = parsedFiles.map(async (el) => {
    const parsedFunctions = el.parsed;
    let parsedContent = el.content;

    const { filePath, backupFilePath } = generateFilePath({
      filePath: el.file,
      outputPath,
      inputPath,
      templateParams,
      backupPath,
    });

    const interpolationMap = parsedFunctionToMap({
      parsedFunctions,
      templateParams,
      templateScript,
      template,
      mapCurrentComponent,
      assets,
    });

    const resolvingInterpolationMap = await Promise.all(interpolationMap);

    resolvingInterpolationMap.forEach((el) => {
      parsedContent = parsedContent.replace(el.interpolationValue, el.interpolationResult);
    });

    requireFunction({
      functionName: 'main',
      variableValue: fileName,
      templateScript,
      template,
      sectionFromSourceMap: mapCurrentComponent,
      resultFileName: templateParams.name,
      assets,
    });

    // flag replace >>>
    let result = null;

    if (fs.existsSync(filePath)) {
      if (config.replace) {
        result = promisifyWriteFile(filePath, parsedContent, { method: pushReplacedFiles });
      }
    } else {
      result = promisifyWriteFile(filePath, parsedContent, { method: pushFiles });
    }
    // <<<

    // flag replace >>>
    if (config.backups) {
      backupFile({ filePath, backupFilePath, template, config });
    }
    // <<<

    return result;
  });

  return Promise.all(writeFilePromises);
};

module.exports = { generateTemplateFiles };

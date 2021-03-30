const { resolve } = require('path');
const chalk = require('chalk');
const fs = require('file-system');
const requireFunction = require('../requireFunction');
const generateFilePath = require('./generateFilePath');
const configPath = require('../../configPath');
const backupFile = require('../../utils/backup/backupFile');
const parsedFunctionToMap = require('../../utils/parsedFunctionToMap');

const generateTemplateFiles = ({
  sourcePath,
  fileName,
  templateValue,
  template,
  mapCurrentComponent,
  assets,
  templateParams,
}) => {
  const config = require(configPath.config);

  const { parsedFiles, templateScript } = templateValue;

  const outputPath = resolve(configPath.outputPath, sourcePath);

  const backupPath = resolve(configPath.arcBackupsPath, sourcePath);

  const inputPath = resolve(configPath.templatesPath, template || '');

  //flag clean
  const dirToRemove = outputPath;
  if (config.clean) {
    if (fs.existsSync(dirToRemove)) {
      fs.rmdirSync(dirToRemove, { recursive: true });
    }
  }

  parsedFiles.forEach(async (el) => {
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

    // flag replace

    if (fs.existsSync(filePath)) {
      if (config.replace) {
        try {
          fs.writeFileSync(filePath, parsedContent);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      try {
        fs.writeFileSync(filePath, parsedContent);
      } catch (err) {
        console.log(err);
      }
    }

    //flag backup

    if (config.backups) {
      backupFile({ filePath, backupFilePath, template, config });
    }
  });
};

const generateTemplateFilesWithoutCash = ({ assets, template, ...rest }) => {
  if (assets) {
    const currentAssets = assets.reduce((acc, { path, ...restAsset }) => {
      if (fs.existsSync(path)) {
        acc.push({
          ...restAsset,
          path,
          content: fs.readFileSync(path),
        });
      }

      return acc;
    }, []);
    console.log(chalk.yellow(`Rebuilding template ${template} component ${rest.fileName}...`));

    const templateConfig = config.templates[template] ? config.templates[template] : config;

    generateTemplateFiles({ ...rest, assets: currentAssets, config: templateConfig });

    console.log(chalk.green('Success'));
  } else {
    console.log(chalk.red(`Assets does't exist in template ${template} component ${rest.fileName}!`));
  }
};

module.exports = { generateTemplateFiles, generateTemplateFilesWithoutCash };

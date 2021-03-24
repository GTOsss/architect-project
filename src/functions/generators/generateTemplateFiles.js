const { resolve } = require('path');
const chalk = require('chalk');
const fs = require('file-system');
const requireFunction = require('../requireFunction');
const generateFilePath = require('./generateFilePath');
const configPath = require('../../configPath');
//const config = require(configPath.config);
const backupFile = require('../../utils/backup/backupFile');
const reGetFunction = new RegExp('.+(?=\\()', 'gm');
const reGetFunctionArgument = /(?<=\().+(?=\))/gm;

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

  parsedFiles.forEach((el) => {
    const parsedFunctions = el.parsed;
    let parsedContent = el.content;

    const { filePath, backupFilePath } = generateFilePath({
      filePath: el.file,
      outputPath,
      inputPath,
      templateParams,
      backupPath,
    });
    parsedFunctions.forEach((el) => {
      let interpolationValue = '';
      let interpolationResult = '';

      const searchFunctionResult = el.str.match(reGetFunction);

      if (searchFunctionResult) {
        const functionInterpolation = searchFunctionResult[0];
        const searchFunctionArgument = el.str.match(reGetFunctionArgument) || [];
        const functionArgument = searchFunctionArgument[0];

        interpolationResult = requireFunction({
          functionName: functionInterpolation,
          variableValue: templateParams.value[functionArgument],
          resultFileName: templateParams.name,
          templateScript,
          template,
          sectionFromSourceMap: mapCurrentComponent,
          assets,
        });
        interpolationValue = `{{${el.str}}}`;
      } else {
        interpolationValue = el.str ? `{{${el.str}}}` : '';

        if (typeof templateParams[el.str] === 'undefined') {
          console.log(chalk.yellow(`Missing parameter ${chalk.blue(el.str)} in template ${chalk.blue(template)} `));
        }
        interpolationResult = templateParams.value[el.str];
      }

      parsedContent = parsedContent.replace(interpolationValue, interpolationResult);
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

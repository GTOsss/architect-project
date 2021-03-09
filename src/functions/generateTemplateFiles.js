const { resolve } = require('path');
const chalk = require('chalk');
const fs = require('file-system');
const requireFunction = require('./requireFunction');
const generateFilePath = require('./generateFilePath');
const configPath = require('../configPath');
const config = require(configPath.config);

const reGetFunction = new RegExp('.+(?=\\()', 'gm');
const reGetFunctionArgument = /(?<=\().+(?=\))/gm;

const generateTemplateFiles = ({
  sourcePath,
  fileName,
  templateValue,
  template,
  mapCurrentComponent,
  assets,
  config,
  templateParams,
}) => {
  const { parsedFiles, templateScript } = templateValue;

  const outputPath = resolve(configPath.outputPath, sourcePath);

  const inputPath = resolve(configPath.templatesPath, template || '');

  //flag clean
  const dirToRemove = resolve(outputPath, fileName);
  if (config.clean) {
    fs.rmdirSync(dirToRemove, { recursive: true });
  }

  parsedFiles.forEach((el) => {
    const parsedFunctions = el.parsed;
    let parsedContent = el.content;

    const filePath = generateFilePath({
      filePath: el.file,
      outputPath,
      inputPath,
      templateParams,
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
          variableValue: templateParams[functionArgument],
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
        interpolationResult = templateParams[el.str];
      }

      parsedContent = parsedContent.replace(interpolationValue, interpolationResult);
    });

    requireFunction({
      functionName: 'main',
      variableName: fileName,
      templateScript,
      template,
      sectionFromSourceMap: mapCurrentComponent,
      resultFileName: templateParams.name,
      assets,
    });

    // flag replace

    if (fs.existsSync(filePath)) {
      if (config.replace) {
        fs.writeFileSync(filePath, parsedContent);
      }
    } else {
      fs.writeFileSync(filePath, parsedContent);
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

    const templateConfig = config.templates[template];

    generateTemplateFiles({ ...rest, assets: currentAssets, config: templateConfig });

    console.log(chalk.green('Success'));
  } else {
    console.log(chalk.red(`Assets does't exist in template ${template} component ${rest.fileName}!`));
  }
};

module.exports = { generateTemplateFiles, generateTemplateFilesWithoutCash };

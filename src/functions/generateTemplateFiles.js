const { resolve } = require('path');
const chalk = require('chalk');
const fs = require('file-system');
const requireFunction = require('./requireFunction');
const generateFilePath = require('./generateFilePath');
const configPath = require('../configPath');
const config = require(configPath.config);

const reGetFunction = new RegExp('.+(?=\\()', 'gm');

const generateTemplateFiles = ({
  sourcePath,
  fileName,
  templateValue,
  template,
  mapCurrentComponent,
  assets,
  config,
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

    const filePath = generateFilePath({ filePath: el.file, componentName: fileName, outputPath, inputPath });

    parsedFunctions.forEach((el) => {
      const functionInterpolation = el.str.match(reGetFunction)[0];

      const resultVariable = requireFunction({
        functionName: functionInterpolation,
        variableName: fileName,
        templateScript,
        template,
        sectionFromSourceMap: mapCurrentComponent,
        assets,
      });
      const functionSting = `{{${el.str}}}`;

      parsedContent = parsedContent.replace(functionSting, resultVariable);
    });

    requireFunction({
      functionName: 'main',
      variableName: fileName,
      templateScript,
      template,
      sectionFromSourceMap: mapCurrentComponent,
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

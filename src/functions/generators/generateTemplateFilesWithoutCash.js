const chalk = require('chalk');
const fs = require('file-system');
const { generateTemplateFiles } = require('./generateTemplateFiles');
const configPath = require('../../configPath');

const generateTemplateFilesWithoutCash = ({ assets, template, ...rest }) => {
  const config = require(configPath.config);

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

module.exports = { generateTemplateFilesWithoutCash };

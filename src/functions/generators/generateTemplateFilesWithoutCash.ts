import chalk from 'chalk';
import fs from 'file-system';
import { generateFilesByTemplate } from './generateFilesByTemplate';
import configPath from '../../configPath';

export const generateTemplateFilesWithoutCash = ({ assets, template, ...rest }) => {
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

    // fixme
    // @ts-expect-error need fix
    generateFilesByTemplate({ ...rest, assets: currentAssets, config: templateConfig });

    console.log(chalk.green('Success'));
  } else {
    console.log(chalk.red(`Assets does't exist in template ${template} component ${rest.fileName}!`));
  }
};

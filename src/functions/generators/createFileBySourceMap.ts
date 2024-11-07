import { getSectionFromSourceMap } from '../getters';
import { parseAssets } from '../parsers';
import { generateTemplateFiles } from './generateTemplateFiles';
import { generateTemplateFilesWithoutCash } from './generateTemplateFilesWithoutCash';
import configPath from '../../configPath';
import { endGeneration } from '../../store/endGeneration';
import { pushFolders } from '../../store/createdFolders';

const memoData = {};

export const memoRebuild = (template) => {
  memoData[template].forEach((templateParams) => {
    generateTemplateFilesWithoutCash({ ...templateParams, template });
  });
};

const awaitEndGeneration = async (endGenerationPromises, event) => {
  await Promise.all(endGenerationPromises);
  event();
};

export const createFilesBySourceMap = (templateMap, sourceMap) => {
  const config = require(configPath.config);
  const { map = {}, aliases = {} } = sourceMap;

  const endGenerationPromises = [];

  Object.entries(map).forEach(([sourcePath, components]) => {
    pushFolders({ folder: sourcePath });

    // fixme
    // @ts-expect-error need fix
    const mapCurrentComponent = getSectionFromSourceMap({ sourcePath, components, aliases });

    Object.entries(components).forEach(([key, value]) => {
      Object.entries(templateMap).forEach(([template, templateValue]) => {
        let valueComponent = value.template ? value.template : value;
        valueComponent = aliases[valueComponent] || valueComponent;

        const assetsKey = value && value.assets;
        const assets = assetsKey ? parseAssets()[assetsKey] : null;

        if (valueComponent === template) {
          const params = { sourcePath, fileName: key, templateValue, template, mapCurrentComponent, assets };

          if (memoData[template]) {
            memoData[template].push(params);
          } else {
            memoData[template] = [params];
          }
          const valueIsString = typeof value === 'string';

          const templateParams = valueIsString ? { value, name: key } : { ...value, name: key };

          const templateConfig = config.templates[template] ? config.templates[template] : config;

          endGenerationPromises.push(generateTemplateFiles({ ...params, config: templateConfig, templateParams }));
        }
      });
    });
  });
  awaitEndGeneration(endGenerationPromises, endGeneration);
  return true;
};

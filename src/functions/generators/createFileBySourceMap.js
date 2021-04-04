const getSectionFromSourceMap = require('../getters/getSectionFromSourceMap');
const parseAssets = require('../parsers/parseAssets');
const { generateTemplateFiles } = require('./generateTemplateFiles');
const { generateTemplateFilesWithoutCash } = require('./generateTemplateFilesWithoutCash');
const configPath = require('../../configPath');
const { endGeneration } = require('../../store/prettyMap');
const { pushFolders } = require('../../store/createdFolders');

const memoData = {};

const memoRebuild = (template) => {
  memoData[template].forEach((templateParams) => {
    generateTemplateFilesWithoutCash({ ...templateParams, template });
  });
};

const awaitEndGeneration = async (arrPromise, event) => {
  await Promise.all(arrPromise);
  event();
};

const createFilesBySourceMap = (templateMap, sourceMap) => {
  const config = require(configPath.config);
  const { map, aliases = {} } = sourceMap;
  Object.entries(map).forEach(([sourcePath, components]) => {
    const arrPromise = [];

    pushFolders({ folder: sourcePath });

    let mapCurrentComponent = getSectionFromSourceMap({ sourcePath, components, aliases });
    Object.entries(components).forEach(([key, value]) => {
      Object.entries(templateMap).forEach(([template, templateValue]) => {
        let valueComponent = value.template ? value.template : value;
        valueComponent = aliases[valueComponent] || valueComponent;

        const assetsKey = value && value.assets;
        let assets = assetsKey ? parseAssets()[assetsKey] : null;

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

          arrPromise.push(generateTemplateFiles({ ...params, config: templateConfig, templateParams }));
        }
      });
    });
    awaitEndGeneration(arrPromise, endGeneration);
  });

  return true;
};

module.exports = {
  createFilesBySourceMap,
  memoRebuild,
};

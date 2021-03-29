const getSectionFromSourceMap = require('../getters/getSectionFromSourceMap');
const parseAssets = require('../parsers/parseAssets');
const { generateTemplateFiles, generateTemplateFilesWithoutCash } = require('./generateTemplateFiles');
const configPath = require('../../configPath');

const memoData = {};

const memoRebuild = (template) => {
  memoData[template].forEach((templateParams) => {
    generateTemplateFilesWithoutCash({ ...templateParams, template });
  });
};

const createFilesBySourceMap = (templateMap, sourceMap) => {
  const config = require(configPath.config);
  const { map, aliases } = sourceMap;
  Object.entries(map).forEach(([sourcePath, components]) => {
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

          const templateParams = { ...value, name: key };

          const templateConfig = config.templates[template] ? config.templates[template] : config;

          generateTemplateFiles({ ...params, config: templateConfig, templateParams });
        }
      });
    });
  });
  return true;
};

module.exports = {
  createFilesBySourceMap,
  memoRebuild,
};

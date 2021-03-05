const getSectionFromSourceMap = require('./getSectionFromSourceMap');
const parseAssets = require('./parseAssets');
const { generateTemplateFiles, generateTemplateFilesWithoutCash } = require('./generateTemplateFiles');
const configPath = require('../configPath');
const config = require(configPath.config);

const memoData = {};

const memoRebuild = (template) => {
  memoData[template].forEach((templateParams) => {
    generateTemplateFilesWithoutCash({ ...templateParams, template });
  });
};

const createFilesBySourceMap = (templateMap, sourceMap) => {
  const { map, aliases } = sourceMap;
  Object.entries(map).forEach(([sourcePath, components]) => {
    let mapCurrentComponent = getSectionFromSourceMap({ sourcePath, components });

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

          generateTemplateFiles({ config, ...params });
        }
      });
    });
  });
};

module.exports = {
  createFilesBySourceMap,
  memoRebuild,
};

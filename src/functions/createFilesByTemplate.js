const getSectionFromSourceMap = require('./getSectionFromSourceMap');
const parseAssets = require('./parseAssets');
const { generateTemplateFiles } = require('./generateTemplateFiles');
const configPath = require('../configPath');
const config = require(configPath.config);

const createFilesByTemplate = ({ templateMap, sourcesMap, configTemplates }) => {
  const { map, aliases } = sourcesMap;
  Object.entries(map).forEach(([sourcePath, components]) => {
    let mapCurrentComponent = getSectionFromSourceMap({ sourcePath, components });

    Object.entries(components).forEach(([key, value]) => {
      Object.entries(templateMap).forEach(([template, templateValue]) => {
        let valueComponent = value.template ? value.template : value;
        valueComponent = aliases[valueComponent];

        const assetsKey = value && value.assets;
        let assets = assetsKey ? parseAssets()[assetsKey] : null;
        configTemplates.forEach((el) => {
          if (valueComponent === el) {
            generateTemplateFiles({
              sourcePath,
              fileName: key,
              templateValue,
              template,
              mapCurrentComponent,
              assets,
              config,
            });
          }
        });
      });
    });
  });
};

module.exports = createFilesByTemplate;

const appRoot = process.cwd();
const fs = require('file-system');
const requireFunction = require('./requireFunction');
const generateFilePath = require('./generateFilePath');
const getSectionFromSourceMap = require('./getSectionFromSourceMap');
const parseAssets = require('./parseAssets');
const { resolve } = require('path');
const config = require(`${appRoot}/settings/config.js`);

const reGetFunction = new RegExp('.+(?=\\()', 'gm');

const generateTemplateFiles = ({ sourcePath, fileName, templateValue, template, mapCurrentComponent, assets }) => {
  const { parsedFiles, templateScript } = templateValue;

  const outputPath = resolve(config.outputPath, sourcePath);

  const inputPath = resolve(config.templatesPath, template);

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

    if (!config.replace) {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, parsedContent);
      }
    }
    if (config.replace) {
      fs.writeFileSync(filePath, parsedContent);
    }
  });
};

const createFilesBySourceMap = (templateMap, sourceMap) => {
  const { map, aliases } = sourceMap;
  Object.entries(map).forEach(([sourcePath, components]) => {
    let mapCurrentComponent = getSectionFromSourceMap({ sourcePath, components });

    Object.entries(components).forEach(([key, value]) => {
      Object.entries(templateMap).forEach(([template, templateValue]) => {
        let valueComponent = value.template ? value.template : value;
        valueComponent = aliases[valueComponent];

        const assetsKey = value && value.assets;
        let assets = assetsKey ? parseAssets()[assetsKey] : null;

        if (valueComponent === template) {
          generateTemplateFiles({ sourcePath, fileName: key, templateValue, template, mapCurrentComponent, assets });
        }
      });
    });
  });
};

module.exports = createFilesBySourceMap;

const fs = require('file-system');
const requireFunction = require('./requireFunction');
const generateFilePath = require('./generateFilePath');
const getSectionFromSourceMap = require('./getSectionFromSourceMap');
const { resolve } = require('path');
const config = require('../../settings/config');

const reGetFunction = new RegExp('.+(?=\\()', 'gm');

const generateTemplateFiles = ({ sourcePath, fileName, templateValue, template, mapCurrentComponent }) => {
  const { parsedFiles, templateScript } = templateValue;
  const outputPath = resolve(__dirname, `../../output/${sourcePath}/`);
  const inputPath = resolve(__dirname, `../../settings/templates/${template}`);

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
      });
      const functionSting = `{{${el.str}}}`;

      parsedContent = parsedContent.replace(functionSting, resultVariable);
    });

    if (config.replace === false) {
      console.log(filePath, fs.existsSync(filePath));
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, parsedContent);
      }
    }
    if (config.replace === true) {
      fs.writeFileSync(filePath, parsedContent);
    }
  });
};

const createFilesBySourceMap = (templateMap, sourceMap) => {
  Object.entries(sourceMap).forEach(([sourcePath, components]) => {
    let mapCurrentComponent = getSectionFromSourceMap({ sourcePath, components });

    Object.entries(components).forEach(([key, value]) => {
      Object.entries(templateMap).forEach(([template, templateValue]) => {
        const valueComponent = value.template ? value.template : value;

        if (valueComponent === template) {
          generateTemplateFiles({ sourcePath, fileName: key, templateValue, template, mapCurrentComponent });
        }
      });
    });
  });
};

module.exports = createFilesBySourceMap;

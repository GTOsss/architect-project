const fs = require('file-system');
const requireFunction = require('./requireFunction');
const generateFilePath = require('./generateFilePath');
const { resolve } = require('path');

const reGetFunction = new RegExp('.+(?=\\()', 'gm');

const generateTemplateFiles = ({ sourcePath, fileName, templateValue, template }) => {
  const { parsedFiles, templateScript } = templateValue;
  const outputPath = resolve(__dirname, `../../output/${sourcePath}/`);

  parsedFiles.forEach((el) => {
    const parsedFunctions = el.parsed;
    let parsedContent = el.content;

    const filePath = generateFilePath({ filePath: el.file, componentName: template, outputPath });

    parsedFunctions.forEach((el) => {
      const functionInterpolation = el.str.match(reGetFunction)[0];

      const resultVariable = requireFunction(functionInterpolation, fileName, templateScript, template);
      const functionSting = `{{${el.str}}}`;

      parsedContent = parsedContent.replace(functionSting, resultVariable);
    });

    fs.writeFileSync(filePath, parsedContent);
  });
};

const createFilesBySourceMap = (templateMap, sourceMap) => {
  Object.entries(sourceMap).forEach(([sourcePath, components]) => {
    Object.entries(components).forEach(([key, value]) => {
      Object.entries(templateMap).forEach(([template, templateValue]) => {
        if (value === template) {
          generateTemplateFiles({ sourcePath, fileName: key, templateValue, template });
        }
      });
    });
  });
};

module.exports = createFilesBySourceMap;

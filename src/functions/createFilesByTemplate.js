const requireFunction = require('./requireFunction');
const fs = require('file-system');
const { resolve } = require('path');

const reGetFunction = new RegExp('.+(?=\\()', 'g');

const inputPath = resolve(__dirname, '../../settings/templates');
const outputPath = resolve(__dirname, `../../output/`);

const generateTemplateFiles = (templateValue, variables, template) => {
  const { parsedFiles, templateScript } = templateValue;

  parsedFiles.forEach((el) => {
    const parsedFunctions = el.parsed;
    let parsedContent = el.content;

    const filePath = el.file.replace(inputPath, outputPath);

    parsedFunctions.forEach((el) => {
      const functionInterpolation = el.str.match(reGetFunction)[0];

      const resultVariable = requireFunction(functionInterpolation, variables, templateScript, template);
      const functionSting = `{{${el.str}}}`;

      parsedContent = parsedContent.replace(functionSting, resultVariable);
    });

    fs.writeFileSync(filePath, parsedContent);
  });
};

const createFilesByTemplate = (templateMap, sourceMap) => {
  Object.entries(templateMap).forEach(([template, templateValue]) => {
    Object.entries(sourceMap).forEach(([key, value]) => {
      if (key === template) {
        generateTemplateFiles(templateValue, value, template);
      }
    });
  });
};

module.exports = createFilesByTemplate;

const fs = require('file-system');
const generateFilePath = require('./generateFilePath');
const requireFunction = require('./requireFunction');
const { resolve } = require('path');

const reGetFunction = new RegExp('.+(?=\\()', 'gm');

const generateTemplateFiles = ({ templateValue, variables, template }) => {
  const { parsedFiles, templateScript } = templateValue;
  const outputPath = resolve(__dirname, `../../output/`);

  parsedFiles.forEach((el) => {
    const parsedFunctions = el.parsed;
    let parsedContent = el.content;

    const filePath = generateFilePath({ filePath: el.file, componentName: template, outputPath });

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
        generateTemplateFiles({ templateValue, variables: value, template });
      }
    });
  });
};

module.exports = createFilesByTemplate;

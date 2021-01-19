const evalFile = require('./evalFile');

const generateTemplateFiles = (parsedFiles, variables) => {
  const reGetFunction = new RegExp('.+(?=\\()', 'g');

  parsedFiles.forEach((el) => {
    const parsedFunctions = el.parsed;
    let parsedContent = el.content;

    parsedFunctions.forEach((el) => {
      const functionInterpolation = el.str.match(reGetFunction)[0];

      const resultVariable = evalFile(functionInterpolation, variables);
      const functionSting = `{{${el.str}}}`;

      parsedContent = parsedContent.replace(functionSting, resultVariable);
    });
    console.log(parsedContent);
  });
};

const functionCall = (template, parsedFiles) => {
  const variables = { 'react-component': 'тимохин компонент', store: 'тимохин стор' };

  Object.entries(variables).forEach(([key, value]) => {
    if (key == template) {
      generateTemplateFiles(parsedFiles, value);
    }
  });
};

module.exports = { generateTemplateFiles, functionCall };

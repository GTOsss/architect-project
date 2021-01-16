const { resolve } = require('path');
const { getObjectWithPaths, parseFiles, createFilesByTemplate } = require('./functions');

const templatesPath = resolve(__dirname, '../settings/templates');

const templates = getObjectWithPaths(templatesPath);
//console.log(objectWithPaths);

const templateMap = parseFiles(templates);

//console.log(matchedFunctions);
// Второй таск

// mock data в будущем будет получена из source-map {
const targetPath = 'src/components/inputs';
const componentName = 'my-component';
const templateName = 'react-component';
// }

createFilesByTemplate({
  targetPath,
  params: { componentName, content: 'какой-то контент' },
  template: templateMap[templateName],
});

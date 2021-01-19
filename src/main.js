const { resolve } = require('path');
const { getObjectWithPaths, parseFiles, createDirTree } = require('./functions');

const templatesPath = resolve(__dirname, '../settings/templates');

const templates = getObjectWithPaths(templatesPath);

const templateMap = parseFiles(templates);

// Второй таск

// mock data в будущем будет получена из source-map {
// const targetPath = 'src/components/inputs';
// const componentName = 'my-component';
// const templateName = 'react-component';
// }

// createFilesByTemplate({
//   targetPath,

//   template: templateMap[templateName],
// });
createDirTree(templateMap);

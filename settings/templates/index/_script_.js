const { toCamelCase, toKebabCase } = require('../../methods/index');

// mock data {
const mockMapSourceCurrentSection = {
  path: 'src/inputs',
  content: {
    i: ['index'],
    rc: ['button', 'textarea', 'input', 'input-select'],
  },
};
// }

const createImportLine = (componentName) =>
  `import ${toCamelCase(componentName)} from '${toKebabCase(componentName)}';`;

const createExportLine = (componentNames) => `export { ${componentNames.map(toCamelCase).join()} };`;

// сюда должен придти объект вида mockMapSourceCurrentSection из source-map
const getContent = (_, { mapSourceCurrentSection }) => {
  const componentNames = mapSourceCurrentSection.content.rc;
  const fileLines = componentNames.map(createImportLine);
  fileLines.push('\n');
  fileLines.push(createExportLine(componentNames));
  return fileLines.join('');
};

module.exports = {
  getContent: getContent.bind(null, null, { mockMapSourceCurrentSection: mockMapSourceCurrentSection }),
};

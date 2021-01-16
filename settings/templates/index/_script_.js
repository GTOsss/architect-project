const { toCamelCase, toKebabCase } = require('../../methods');

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
  `import ${toCamelCase(componentName)} from '${toKebabCase(componentName)}';\n`;

const createExportLine = (componentNames) => `export { ${componentNames.map(toCamelCase).join()} };`;

// сюда должен придти объект вида mockMeta из source-map
const getContent = ({ mapSourceCurrentSection }) => {
  const componentNames = mapSourceCurrentSection.content.rc;

  const fileLines = componentNames.map(createImportLine);
  fileLines.push('\n');
  fileLines.push(createExportLine(componentNames));

  return fileLines.join('');
};

const doSomething = (str) => {
  console.log(str);
};

module.exports = {
  getContent,
  doSomething,
};

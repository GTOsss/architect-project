const { toCamelCase, toKebabCase } = require('../../methods');

const createImportLine = (componentName) =>
  `import ${toCamelCase(componentName)} from '${toKebabCase(componentName)}';\n`;

const createExportLine = (componentNames) => `export { ${componentNames.map(toCamelCase).join()} };`;

const getContent = (_, { sectionFromSourceMap }) => {
  const componentNames = sectionFromSourceMap.content['rc'];

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

const minimizeSVG = (svg) => svg;
const { resolve } = require('path');

const getIndexContent = () => {
  return 'export file';
};

const main = (_, { assets, writeFile }) => {
  // writeFile({ sectionFromSourceMap });

  // assets = [
  // {path: '.../arrow-left.svg', content: <Buffer> [..]},
  // {path: '.../arrow-right.svg', content: <Buffer> [..]},
  // ];

  assets.forEach(({ content, fileName }) => {
    const result = minimizeSVG(content);
    writeFile(result, { path: `svg/${fileName}` });
    // writeFile(result, { path: './inner/inner2' });
  });

  console.log('content for icons');
};

module.exports = {
  main,
  getIndexContent,
};

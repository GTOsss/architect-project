const minimizeSVG = (svg) => svg;
const { resolve } = require('path');

const getContent = (_, { sectionFromSourceMap, writeFile }) => {
  writeFile({ sectionFromSourceMap });
};

module.exports = {
  getContent,
};

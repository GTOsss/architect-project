const minimizeSVG = (svg) => svg;

const getIndexContent = () => {
  return 'export file';
};

const main = (_, { assets, writeFile }) => {
  assets.forEach(({ content, fileName }) => {
    const result = minimizeSVG(content);
    writeFile(result, { path: `svg/${fileName}` });
  });
};

module.exports = {
  main,
  getIndexContent,
};

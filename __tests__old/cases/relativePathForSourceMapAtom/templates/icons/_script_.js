const minimizeSVG = (svg) => svg;

const getIndexContent = () => {
  return 'const t = "t"';
};

const main = (_, { assets, writeFile }) => {
  assets.forEach(({ content, fileName }) => {
    const result = minimizeSVG(content);
    writeFile('test', { path: `svg/${fileName}` });
  });
};

module.exports = {
  main,
  getIndexContent,
};

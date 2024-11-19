const getIndexContent = () => {
  return 'const t = "t"';
};

const main = (_, { assets, writeFile }) => {
  if (assets) {
    assets.forEach(({ fileName }) => {
      writeFile('test', { path: `svg/${fileName}` });
    });
  }
};

module.exports = {
  main,
  getIndexContent,
};

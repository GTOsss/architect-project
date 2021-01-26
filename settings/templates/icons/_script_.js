const minimizeSVG = (svg) => svg;

const getContent = (_, { sectionFromSourceMap, assets, writeFile }) => {
  // assets = [
  // {path: '.../arrow-left.svg', content: <Buffer> [..]},
  // {path: '.../arrow-right.svg', content: <Buffer> [..]},
  // ];

  assets.forEach(({ content }) => {
    const result = minimizeSVG(content);
    writeFile(result);
    // writeFile(result, { path: './inner/inner2' });
  });

  console.log('content for icons');
};

module.exports = {
  getContent,
};

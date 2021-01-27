const fs = require('file-system');
const { resolve } = require('path');

const writeFile = ({ sectionFromSourceMap, path }) => {
  sectionFromSourceMap.assets.forEach((el) => {
    const fileName = el.path.split('\\').pop();
    const outputPath = path
      ? `${path}/${fileName}`
      : resolve(__dirname, `../../output/${sectionFromSourceMap.path}/min/${fileName}`);

    fs.writeFileSync(outputPath, el.content);
  });
};

module.exports = writeFile;

// TODO
//  попробовать path.basename('/srv/app/app.js')

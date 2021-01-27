const { resolve, basename } = require('path');
const fs = require('file-system');
const getFilesPath = require('./getFilesPath');

const parseAssets = () => {
  const assetsPath = resolve(__dirname, '../../settings/assets');

  const allFilesPaths = getFilesPath(assetsPath);

  return allFilesPaths.reduce((acc, { templateName, files }) => {
    acc[templateName] = files.map((path) => ({
      fileName: basename(path),
      path: path,
      content: fs.readFileSync(path),
    }));
    return acc;
  }, {});
};

module.exports = parseAssets;

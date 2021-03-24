const { basename } = require('path');
const fs = require('file-system');
const configPath = require('../../configPath');
const getFilesPath = require('../getters/getObjectWithPaths');

const parseAssets = () => {
  const assetsPath = configPath.assetsPath;

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

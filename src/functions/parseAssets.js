const appRoot = process.cwd();
const config = require(`${appRoot}/settings/config.js`);
const { basename } = require('path');
const fs = require('file-system');
const getFilesPath = require('./getFilesPath');

const parseAssets = () => {
  const assetsPath = config.assetsPath;

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

const { resolve } = require('path');
const fs = require('file-system');
const getFilesPath = require('./getFilesPath');

const parseAssets = () => {
  const objectArr = [];
  const assetsPath = resolve(__dirname, '../../settings/assets');

  const allFilesPaths = getFilesPath(assetsPath);

  allFilesPaths.forEach((filePath) => {
    const { files, templateName } = filePath;

    const contentArr = files.map((path) => fs.readFileSync(path));

    objectArr.push({ templateName, files, content: contentArr });
  });

  return objectArr;
};

module.exports = parseAssets;

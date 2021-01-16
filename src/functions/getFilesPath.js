const fs = require('file-system');
const { resolve } = require('path');

const getChildPaths = (dir, result) => {
  result = result || [];

  const files = fs.readdirSync(dir);

  for (const i in files) {
    const path = `${dir}/${files[i]}`;

    if (fs.statSync(path).isDirectory()) {
      getChildPaths(path, result);
    } else if (!/\_script_.js$/.test(path)) {
      result.push(path);
    }
  }

  return result;
};

const getFilesPath = (dir) => {
  const allPaths = [];

  const parentPathsFile = fs.readdirSync(dir);

  parentPathsFile.forEach((el, i) => {
    allPaths.push({
      templateName: el,
      files: getChildPaths(resolve(dir, el)),
    });
  });

  return allPaths;
};

module.exports = getFilesPath;

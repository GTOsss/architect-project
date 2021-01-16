const fs = require('file-system');

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

  const parentPathsfile = fs.readdirSync(dir);

  for (const i in parentPathsfile) {
    let parentPaths = `${dir}/${parentPathsfile[i]}`;
    allPaths.push(getChildPaths(parentPaths));
  }
  return allPaths;
};

module.exports = getFilesPath;

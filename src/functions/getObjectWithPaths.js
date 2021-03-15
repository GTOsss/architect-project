const getFilesPath = require('./getFilesPath');

const getObjectWithPaths = (dir) => {
  return getFilesPath(dir);
};

module.exports = getObjectWithPaths;

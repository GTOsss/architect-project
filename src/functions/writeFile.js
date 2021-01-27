const fs = require('file-system');
const { resolve } = require('path');

const getWriteFile = (dirPath) => (content, { path }) => {
  fs.writeFileSync(resolve(dirPath, path), content);
};

module.exports = getWriteFile;

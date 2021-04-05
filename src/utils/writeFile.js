const fs = require('file-system');
const { resolve } = require('path');

const getWriteFile = (dirPath) => (content, { rPath }) => {
  fs.writeFileSync(resolve(dirPath, rPath), content);
};

const getWriteFileStream = (dirPath) => ({ data, rPath = '', fileName = 'test.txt' }) => {
  fs.mkdirSync(resolve(dirPath, rPath));

  data.pipe(fs.createWriteStream(resolve(dirPath, rPath, fileName)));
};

module.exports = { getWriteFile, getWriteFileStream };

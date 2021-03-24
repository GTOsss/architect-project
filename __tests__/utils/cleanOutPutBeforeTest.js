const fs = require('file-system');

const cleanOutPutBeforeTest = (path) => {
  if (fs.existsSync(path)) {
    fs.rmdirSync(path);
  }
};

module.exports = cleanOutPutBeforeTest;

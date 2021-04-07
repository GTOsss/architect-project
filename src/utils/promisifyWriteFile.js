const fs = require('file-system');

const promisifyWriteFile = (filePath, parsedContent, { method }) => {
  try {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, parsedContent, (err) => {
        if (err) reject(err);
        else {
          method({ filePath });

          resolve();
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { promisifyWriteFile };

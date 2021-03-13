const fs = require('file-system');
const { resolve } = require('path');
const appendVersion = require('./appendVersion');

const date = new Date();
const prettyDate = `${date.toISOString().replace(/:/gi, '-').replace('T', '.')}`;

const backupFile = ({ filePath, backupFilePath, template, config }) => {
  const splitBackup = backupFilePath.split('\\src\\');
  const backupPathWithDate = resolve(splitBackup[0], template, prettyDate, 'src', splitBackup[1]);

  try {
    fs.copyFileSync(filePath, backupPathWithDate);
  } catch (err) {
    console.log(err);
  }
  appendVersion({ date: prettyDate, template, config });
};

module.exports = backupFile;

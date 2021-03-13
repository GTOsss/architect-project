const fs = require('file-system');
const { resolve } = require('path');

const cleanHistory = ({ jsonArr, arcBackupsPath, template }) => {
  const pathsToDelete = [];

  jsonArr.push('versions.json');

  const arcBackupsTemplatePath = resolve(arcBackupsPath, template);

  try {
    const paths = fs.readdirSync(arcBackupsTemplatePath);

    paths.forEach((el) => {
      if (jsonArr.indexOf(el) === -1) {
        pathsToDelete.push(el);
      }
    });
  } catch (err) {
    console.log(err);
  }

  pathsToDelete.forEach((el) => {
    const fullPath = resolve(arcBackupsTemplatePath, el);

    try {
      fs.rmdirSync(fullPath);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = cleanHistory;

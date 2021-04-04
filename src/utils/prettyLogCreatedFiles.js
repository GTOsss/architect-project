const chalk = require('chalk');

const prettyLogCreatedFiles = (obj, method) => {
  Object.entries(obj).forEach(([folder, paths]) => {
    if (paths.length !== 0) {
      console.log(chalk.cyan(`\n Arc ${method} files in folder ${folder} >>> \n`));
      paths.forEach((path) => console.log(`file:///${path}`));
    }
  });
};

const toMapFolderWithFiles = ({ foldersList, filesList }) => {
  return foldersList.reduce((acc, folder) => {
    const filter = filesList.filter((path) => {
      const reFolder = new RegExp(`${folder}\/(?!.*\/)`, 'g');

      return reFolder.test(path);
    });
    acc[folder] = filter;
    return acc;
  }, {});
};

module.exports = { prettyLogCreatedFiles, toMapFolderWithFiles };

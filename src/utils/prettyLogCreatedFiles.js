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
  foldersList.sort((a, b) => b.length - a.length);

  const testedPath = new Set();

  return foldersList.reduce((acc, folder) => {
    const filter = filesList.filter((path) => {
      const reFolder = new RegExp(`${folder}`, 'g');

      return reFolder.test(path);
    });

    filter.forEach((path) => {
      if (testedPath.has(path)) {
        filter.splice(filter.indexOf(path), 1);
      }
    });

    acc[folder] = filter;

    filter.forEach((path) => {
      testedPath.add(path);
    });

    return acc;
  }, {});
};

module.exports = { prettyLogCreatedFiles, toMapFolderWithFiles };
